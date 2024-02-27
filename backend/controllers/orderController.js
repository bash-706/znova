const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');
const Service = require('../models/serviceModel');
const catchAsync = require('../utils/catchAsync');
const handleFactory = require('./handleFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1. Get the currently ordered service
  const service = await Service.findById(req.params.serviceId);
  const { name, price, summary, duration, revisions } = req.body.item;
  // 2.Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/`,
    success_url: `http://localhost:5173/home?service=${req.params.serviceId}&user=${req.user.id}&price=${price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/services/${service.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.serviceId,
    mode: 'payment',

    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${service.name} - ${name}`,
            images: [`https://www.natours.dev/img/tours/tour-2-cover.jpg`],
            description: `${summary} \n (${duration} delivery) \n (${revisions} revision${
              revisions > 1 ? 's' : ''
            })`,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
  });
  // 3. Send the session as response
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
