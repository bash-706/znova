const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const Review = require('../models/reviewModel');

const router = express.Router({ mergeParams: true });

router
  .route('/user-reviews/:userId')
  .get(authController.protect, reviewController.getUserReviews);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.hasplacedOrder,
    reviewController.setServiceUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    authController.checkAuthorization(Review),
    reviewController.updateReview,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    authController.checkAuthorization(Review),
    reviewController.deleteReview,
  );

module.exports = router;
