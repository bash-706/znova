const express = require('express');
const authController = require('../controllers/authController');
const FAQ = require('../models/faqModel');
const faqController = require('../controllers/faqController');

const router = express.Router();

router.route('/service/:serviceId').get(faqController.getFaqsByService);

router
  .route('/')
  .get(faqController.getAllFaqs)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    faqController.createFaq,
  );

router
  .route('/:id')
  .get(faqController.getFaq)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    authController.checkAuthorization(FAQ),
    faqController.updateFaq,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'digitalist'),
    authController.checkAuthorization(FAQ),
    faqController.deleteFaq,
  );

module.exports = router;
