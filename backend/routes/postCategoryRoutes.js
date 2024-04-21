const express = require('express');
const postCategoryController = require('../controllers/postCategoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(postCategoryController.getAllPostCategories)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    postCategoryController.createPostCategory,
  );

router
  .route('/:id')
  .get(postCategoryController.getPostCategory)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    postCategoryController.updatePostCategory,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    postCategoryController.deletePostCategoryField,
    postCategoryController.deletePostCategory,
  );

module.exports = router;
