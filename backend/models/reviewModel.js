const mongoose = require('mongoose');
const Service = require('./serviceModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review must be provided'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      required: [true, 'Rating must be provided'],
    },
    createdAt: Date,
    service: {
      type: mongoose.Schema.ObjectId,
      ref: 'Service',
      required: [true, 'Review must belong to a service'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.index({ service: 1, user: 1 } /*{ unique: true }*/);

reviewSchema.statics.calcAverageRatings = async function (serviceId) {
  const stats = await this.aggregate([
    { $match: { service: serviceId } },
    {
      $group: {
        _id: 'service',
        nRatings: { $sum: 1 },
        avgRatings: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Service.findByIdAndUpdate(serviceId, {
      ratingsAverage: stats[0].avgRatings,
      ratingsQuantity: stats[0].nRatings,
    });
  } else {
    await Service.findByIdAndUpdate(serviceId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.service);
});

reviewSchema.post(/^findOneAnd/, (doc) => {
  doc.constructor.calcAverageRatings(doc.service);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
