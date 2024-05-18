const express = require('express');
const serviceCategoryController = require('../controllers/serviceCategoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(serviceCategoryController.getAllServiceCategories)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    serviceCategoryController.createServiceCategory,
  );

router
  .route('/:id')
  .get(serviceCategoryController.getServiceCategory)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    serviceCategoryController.updateServiceCategory,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    serviceCategoryController.deleteServiceCategoryField,
    serviceCategoryController.deleteServiceCategory,
  );

module.exports = router;
