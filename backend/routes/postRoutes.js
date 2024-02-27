const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const Post = require('../models/postModel');

const router = express.Router();

router.get('/get-post/:slug', postController.getPostBySlug);
router.get(
  '/latest-posts',
  postController.aliasLatestPosts,
  postController.getAllPosts,
);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    postController.uploadPostImage,
    postController.resizePostImage,
    postController.setUserId,
    postController.createPost,
  );

router
  .route('/:id')
  .get(postController.getPost)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    authController.checkAuthorization(Post),
    postController.uploadPostImage,
    postController.resizePostImage,
    postController.updatePost,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    authController.checkAuthorization(Post),
    postController.deletePost,
  );

module.exports = router;
