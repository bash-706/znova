const express = require('express');
const serviceController = require('../controllers/serviceController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const Service = require('../models/serviceModel');

const router = express.Router();

router.use('/:serviceId/reviews', reviewRouter);

router
  .route('/best-services')
  .get(serviceController.aliasBestServices, serviceController.getAllServices);

router.get('/get-service/:slug', serviceController.getServiceBySlug);

router
  .route('/')
  .get(serviceController.getAllServices)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    serviceController.uploadServiceImages,
    serviceController.resizeServiceImages,
    serviceController.setUserId,
    serviceController.handleServiceCreating,
    serviceController.createService,
  );

router
  .route('/:id')
  .get(serviceController.getService)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    authController.checkAuthorization(Service),
    serviceController.uploadServiceImages,
    serviceController.resizeServiceImages,
    serviceController.handleServiceUpdating,
    serviceController.updateService,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    authController.checkAuthorization(Service),
    serviceController.deleteService,
  );

module.exports = router;
