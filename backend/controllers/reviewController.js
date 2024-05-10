const Order = require('../models/orderModel');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const handleFactory = require('./handleFactory');

exports.setServiceUserIds = (req, res, next) => {
  // Allowing Nested Routes
  if (!req.body.service) req.body.service = req.params.serviceId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.hasplacedOrder = catchAsync(async (req, res, next) => {
  const hasOrder = await Order.findOne({
    service: req.params.serviceId,
    customer: req.user.id,
  });
  if (hasOrder) return next();
  return next(
    new AppError('You can only review services you have purchased', 403),
  );
});

exports.getAllReviews = handleFactory.getAll(
  Review,
  {
    path: 'service',
    select: 'name imageCover',
  },
  { path: 'user', select: 'name username' },
);
exports.getReview = handleFactory.getOne(Review);
exports.createReview = handleFactory.createOne(Review);
exports.updateReview = handleFactory.updateOne(Review);
exports.deleteReview = handleFactory.deleteOne(Review);
