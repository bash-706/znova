const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');
const Comment = require('../models/commentModel');

const router = express.Router();

router
  .route('/')
  .get(commentController.getAllComments)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    commentController.createComment,
  );

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    authController.checkAuthorization(Comment),
    commentController.checkToFalse,
    commentController.updateComment,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    authController.checkAuthorization(Comment),
    commentController.deleteComment,
  );

module.exports = router;
