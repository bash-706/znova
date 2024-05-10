const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'An order must belong to a customer'],
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: 'Service',
    required: [true, 'An order must belong to a service'],
  },
  price: {
    type: Number,
    required: [true, 'An order must have a price'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Cancelled', 'Delivered'],
    default: 'Pending',
  },
  paid: {
    type: Boolean,
    default: true,
  },
  createdAt: Date,
});

orderSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate('customer').populate({
    path: 'service',
    select: 'name packages',
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
