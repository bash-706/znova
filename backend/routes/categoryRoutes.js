// const express = require('express');
// const categoryController = require('../controllers/categoryController');
// const authController = require('../controllers/authController');

// const router = express.Router();

// router.use(authController.protect);

// router
//   .route('/')
//   .get(categoryController.getAllCategories)
//   .post(
//     authController.restrictTo('admin', 'digitalist'),
//     categoryController.createCategory,
//   );

// router
//   .route('/:id')
//   .get(categoryController.getCategory)
//   .patch(
//     authController.restrictTo('admin', 'digitalist'),
//     categoryController.updateCategory,
//   )
//   .delete(
//     authController.restrictTo('admin', 'digitalist'),
//     categoryController.deleteCategory,
//   );

// module.exports = router;
