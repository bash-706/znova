const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    lowercase: true,
    minlength: [6, 'Username must contain atleast 6 chracters'],
    maxlength: [20, 'Username cannot have more than 20 chracters'],
    validate: [
      {
        validator: function (value) {
          return /^[a-zA-Z0-9_]+$/.test(value);
        },
        message:
          'Username can only contain alphanumeric characters and underscores',
      },
      {
        validator: function (value) {
          return /^[a-zA-Z]/.test(value);
        },
        message: 'Username must start with an alphabet character',
      },
    ],
  },
  role: {
    type: String,
    enum: ['admin', 'digitalist', 'user'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  languages: {
    type: [String],
    maxlength: [5, 'User can only add upto 5 languages'],
  },
  country: {
    type: String,
    required: [true, 'Please provide your country'],
  },
  biodata: {
    type: String,
    trim: true,
    maxlength: [250, 'A bio must not exceed 250 chracters'],
    default: '',
  },
  skills: {
    type: [String],
    maxlength: [10, 'User can only add upto 10 skills'],
  },
  isVerified: {
    type: Boolean,
    default: false,
    select: false,
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: Date,
  accountVerificationToken: String,
  accountVerificationExpires: Date,
  accountActivationToken: String,
  accountActivationExpires: Date,
  createdAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});

// userSchema.pre(/^find/, function (next) {
// this.find({ active: { $ne: false } });
// next();
// });

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return changedTimestamp > JWTTimestamp;
  }
  return false;
};

userSchema.methods.createAccountVerificationToken = function (
  saveToDatabase = false,
) {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  this.accountVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  this.accountVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
  if (saveToDatabase) {
    this.save({ validateBeforeSave: false });
  }

  return verificationToken;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.methods.createAccountActivationToken = function () {
  const activationToken = crypto.randomBytes(32).toString('hex');
  this.accountActivationToken = crypto
    .createHash('sha256')
    .update(activationToken)
    .digest('hex');
  this.accountActivationExpires = Date.now() + 24 * 60 * 60 * 1000;
  this.save({ validateBeforeSave: false });
  return activationToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
