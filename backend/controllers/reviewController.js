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

exports.getUnreviewedOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({
    service: req.params.serviceId,
    customer: req.user.id,
    status: 'Delivered',
  }).sort('createdAt');

  const unreviewedOrders = await Promise.all(
    orders.map(async (order) => {
      const review = await Review.findOne({
        service: req.params.serviceId,
        user: req.user.id,
        order: order._id,
      });

      return review ? null : order;
    }),
  );

  const availableOrders = unreviewedOrders.filter((order) => order !== null);

  res.status(200).json({
    status: 'success',
    data: {
      orders: availableOrders,
    },
  });
});

exports.hasplacedOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find({
    service: req.params.serviceId,
    customer: req.user.id,
    status: 'Delivered',
  });

  if (!orders || orders.length === 0) {
    return next(
      new AppError(
        'You can only review services you have purchased and have been completed',
        403,
      ),
    );
  }

  const unreviewedOrder = await Promise.all(
    orders.map(async (order) => {
      const hasReview = await Review.findOne({
        service: req.params.serviceId,
        customer: req.user.id,
        order: order.id,
      });
      return hasReview ? null : order;
    }),
  ).catch(() => null);

  if (!unreviewedOrder) {
    return next(
      new AppError(
        'You have already reviewed all your purchases of this service',
        403,
      ),
    );
  }

  return next();
});

exports.getUserReviews = catchAsync(async (req, res, next) => {
  const filter = { user: req.params.userId };

  const docs = await Review.find(filter).populate({
    path: 'service',
    select: 'name imageCover',
  });
  res.status(200).json({
    status: 'success',
    totalDocs: docs.length,
    data: {
      data: docs,
    },
  });
});

exports.getAllReviews = handleFactory.getAll(Review, {
  path: 'service',
  select: 'name imageCover',
});
exports.getReview = handleFactory.getOne(Review);
exports.createReview = handleFactory.createOne(Review);
exports.updateReview = handleFactory.updateOne(Review);
exports.deleteReview = handleFactory.deleteOne(Review);
