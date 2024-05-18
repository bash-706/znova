const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // Removing password and isVerified from output
  user.password = undefined;
  user.isVerified = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // 1. Create a new user but mark it as unverified
  const filteredBody = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    country: req.body.country,
    languages: req.body.languages,
  };
  if (req.file) filteredBody.photo = req.file.filename;

  const user = await User.create(filteredBody);

  // 2. Generate verification token with expiration
  const verificationToken = user.createAccountVerificationToken();
  user.save({ validateBeforeSave: false });

  // 3. Send verification email to the user
  // const verificationURL = `${req.protocol}://${req.get(
  // 'host',
  // )}/verify-account/${verificationToken}`;

  const verificationURL = `http://localhost:5173/verify-account/${verificationToken}`;
  await new Email(user, verificationURL).verifyEmail();
  res.status(201).json({
    status: 'success',
    message:
      'Account created successfully! Verification link sent to your email address. Please check the inbox and click the link to activate your account',
  });
});

exports.verifyAccount = catchAsync(async (req, res, next) => {
  // 1. Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.verificationToken)
    .digest('hex');

  const user = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationExpires: { $gt: Date.now() },
  });

  // 2. If token has not been expired and there's user, set the isVerified to true
  if (!user) return next(new AppError('Token is invalid or has expired', 400));
  user.isVerified = true;
  user.accountVerificationToken = undefined;
  user.accountVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  // 3. Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, username, password } = req.body;
  // Check if email and password exist
  if (!email && !username) {
    return next(new AppError('Please provide email or username', 400));
  }
  if (!password) {
    return next(new AppError('Please provide password', 400));
  }

  // // Check if user exist and password is correct
  const user = await User.findOne({
    $or: [{ email }, { username }],
  }).select('+password +isVerified +active');

  if (!user || !(await user.correctPassword(password, user.password))) {
    // if (!user) {
    return next(new AppError('Incorrect email/username or password', 401));
  }

  if (!user.active) {
    const activationToken = user.createAccountActivationToken();
    const activationURL = `http://localhost:5173/activate-account/${activationToken}`;
    await new Email(user, activationURL).activateAccount();

    return next(
      new AppError(
        'Your account is no longer active. In order to activate your account, please click on the account activation link we just sent to your email address.',
      ),
    );
  }

  if (!user.isVerified) {
    const verificationToken = user.createAccountVerificationToken(true);
    const verificationURL = `http://localhost:5173/verify-account/${verificationToken}`;
    await new Email(user, verificationURL).verifyEmail();

    return next(
      new AppError(
        'Your account has not been verified yet. In order to verify your account, please click on the account verification link we just sent to your email address.',
        403,
      ),
    );
  }

  // Send the JWT to the user
  createSendToken(user, 200, res);
});

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Getting token and checking if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access', 401),
    );
  }
  // 2. Verifying Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3. Checking if user still exists
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError(
        'The user belonging to this token does no longer exist',
        401,
      ),
    );

  // 4. Checking if user changed the password after the token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please log in again.', 401),
    );
  }

  req.user = user;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not allowed to perform this action', 403),
      );
    }
    return next();
  };

exports.checkAuthorization = (model) =>
  catchAsync(async (req, res, next) => {
    const document = await model.findById(req.params.id);
    const docUserId =
      model.modelName === 'Review'
        ? document.user._id.toString()
        : document.user.toString();

    if (!(req.user.role === 'admin') && !(req.user.id === docUserId)) {
      return next(
        new AppError(
          `You can only delete or update your own ${model.modelName.toLowerCase()}s`,
          403,
        ),
      );
    }
    next();
  });

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(
      new AppError('There is no user associated with the email address', 404),
    );
  // 2. Generate a random reset token
  const resetToken = user.createPasswordResetToken();
  user.save({ validateBeforeSave: false });

  // 3. Send the token to user's email
  // const resetURL = `${req.protocol}://${req.get(
  // 'host',
  // )}/reset-password/${resetToken}`;

  const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

  await new Email(user, resetURL).resetEmail();

  // 4. Send response to the user
  res.status(200).json({
    status: 'success',
    message:
      'We have sent an email to the email address associated with your account. Please check your inbox for further instructions on how to reset your password.',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2. If token has not been expired and there's user, set the new password
  if (!user) return next(new AppError('Token is invalid or has expired', 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save({ validateBeforeSave: false });
  // 3. Update the passwordChangedAt property from the user document
  // 4. Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.activateAccount = catchAsync(async (req, res, next) => {
  // 1. Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.activationToken)
    .digest('hex');
  const user = await User.findOne({
    accountActivationToken: hashedToken,
    accountActivationExpires: { $gt: Date.now() },
  });
  // 2. If token has not been expired and there's user, set the new password
  if (!user) return next(new AppError('Token is invalid or has expired', 400));
  user.active = true;
  user.accountActivationExpires = undefined;
  user.accountActivationToken = undefined;
  await user.save({ validateBeforeSave: false });
  // 3. Update the passwordChangedAt property from the user document
  // 4. Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get the user from the document
  const user = await User.findById(req.user._id).select('+password');
  // 2. Check if password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is incorrect', 401));
  }
  // 3. If so, then update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4. Log the user in, send JWT
  createSendToken(user, 201, res);
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1. Verifying JWT
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      // 2. Checking if user still exist
      const user = await User.findById(decoded.id);
      if (!user) {
        return next();
      }
      // 3. Checking if user changed password after the token was issued
      if (user.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // There is a logged in user
      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
      // res.locals.user = user;
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: err.message,
      });
    }
  }
};
