const axios = require('axios');
const Order = require('../models/orderModel');
const Service = require('../models/serviceModel');
const catchAsync = require('../utils/catchAsync');
const handleFactory = require('./handleFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1. Get the currently ordered service
  const service = await Service.findById(req.params.serviceId);
  const { name, price, summary, duration, revisions } = req.body.item;

  // 2. Create checkout session
  const options = {
    method: 'POST',
    url: 'https://service-sandbox.tazapay.com/v3/checkout',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Basic ${Buffer.from(
        `${process.env.TAZAPAY_API_KEY}:${process.env.TAZAPAY_API_SECRET}`,
      ).toString('base64')}`,
    },
    data: {
      invoice_currency: 'USD',
      amount: price * 100,
      customer_details: {
        name: req.user.name,
        country: 'US',
        email: req.user.email,
      },
      success_url: `http://localhost:5173/home?service=${req.params.serviceId}&user=${req.user.id}&price=${price}`,
      cancel_url: `http://localhost:5173/services/${service.slug}`,
      webhook_url: `${req.protocol}://${req.get('host')}/api/v1/orders`,
      payment_methods: ['card'],
      transaction_description: `${
        service.name
      } - ${name} \n (${summary}) \n (${duration} delivery) \n (${revisions} revision${
        revisions > 1 ? 's' : ''
      }))`,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      reference_id: `order_${req.params.serviceId}_${req.user._id}`,
    },
  };
  const response = await axios.request(options);

  res.status(200).json({
    status: 'success',
    session: response.data.data,
  });
});

exports.getBusinessPlansCheckoutSession = catchAsync(async (req, res, next) => {
  const { plan } = req.query;
  let price;
  let planName;

  switch (plan) {
    case 'basic':
      price = 100;
      planName = 'Basic';
      break;
    case 'standard':
      price = 200;
      planName = 'Standard';
      break;
    case 'premium':
      price = 500;
      planName = 'Premium';
      break;
    default:
      return res.status(400).json({
        status: 'error',
        message: 'Invalid plan selected',
      });
  }

  // 2. Create checkout session
  const options = {
    method: 'POST',
    url: 'https://service-sandbox.tazapay.com/v3/checkout',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Basic ${Buffer.from(
        `${process.env.TAZAPAY_API_KEY}:${process.env.TAZAPAY_API_SECRET}`,
      ).toString('base64')}`,
    },
    data: {
      invoice_currency: 'USD',
      amount: price * 100,
      customer_details: {
        name: req.user.name,
        country: 'US',
        email: req.user.email,
      },
      success_url: `http://localhost:5173/home?plan=${plan}&user=${req.user.id}&price=${price}`,
      cancel_url: `http://localhost:5173/plans`,
      webhook_url: `${req.protocol}://${req.get('host')}/api/v1/orders`,
      payment_methods: ['card'],
      transaction_description: `Z Nova - ${planName} Business Plan Subscription`,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      reference_id: `order_${plan}_${req.user._id}`,
    },
  };

  const response = await axios.request(options);
  const session = response.data.data;

  // Send the session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

// exports.createOrderCheckout = catchAsync(async (req, res, next) => {
//   const { service, user, price } = req.query;

//   if (!service || !user || !price) return next();

//   await Order.create({ service, user, price });
//   res.redirect(req.originalUrl.split('?')[0]);
// });

exports.getAllOrders = handleFactory.getAll(Order);
exports.getOrder = handleFactory.getOne(Order);
exports.createOrder = handleFactory.createOne(Order);
exports.updateOrder = handleFactory.updateOne(Order);
exports.deleteOrder = handleFactory.deleteOne(Order);
