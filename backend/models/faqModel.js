const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: Date,
});

faqSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
