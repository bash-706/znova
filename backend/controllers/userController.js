const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const handleFactory = require('./handleFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload images only.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = req.user
    ? `user-${req.user.id}-${Date.now()}.jpeg`
    : `user-${req.body.email}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/users/${req.file.filename}`);
  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateAccount = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    next(
      new AppError(
        'This route is not for updating passwords. Please use api/v1/users/update-password to update your password.',
        400,
      ),
    );
  const filteredBody = filterObj(
    req.body,
    'name',
    'username',
    'email',
    'country',
    'biodata',
    'role',
  );
  if (req.file) filteredBody.photo = req.file.filename;
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id).select('+password +active');

  if (!user) return next(new AppError('User not found!'));

  if (!(await user.correctPassword(password, user.password))) {
    // if (!user) {
    return next(new AppError('The password you entered is incorrect!', 401));
  }
  user.active = false;
  await user.save({ validateBeforeSave: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message:
      'This route is not implemented. Please use /api/v1/users/auth/signup instead.',
  });
});

exports.getAccount = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.setPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.body.photo = req.file.filename;
  next();
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const data = await User.find().select('+active +isVerified');

  res.status(200).json({
    status: 'success',
    results: data.length,
    data: {
      data,
    },
  });
});

exports.getUser = handleFactory.getOne(User);
exports.updateUser = handleFactory.updateOne(User);
exports.deleteUser = handleFactory.deleteOne(User);
