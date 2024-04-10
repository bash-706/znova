const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/checkout-session/:serviceId', orderController.getCheckoutSession);

router.post(
  '/checkout-business-session',
  orderController.getBusinessPlansCheckoutSession,
);

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
