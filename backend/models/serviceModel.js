const mongoose = require('mongoose');
const slugify = require('slugify');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'A service must have a name'],
      minlength: [30, 'A service name must have atleast 30 chracters'],
      maxlength: [100, 'A service name must not exceed 100 chracters'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must be above 1.0'],
      max: [5, 'Ratings must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A service must have a description'],
      minlength: [100, 'A service description must have atleast 100 chracters'],
      maxlength: [800, 'A service description must not exceed 800 chracter'],
    },
    imageCover: {
      type: String,
      required: [true, 'A service must have a cover image'],
      default: 'default.png',
    },
    category: {
      type: String,
      required: [true, 'A service must belong to a category'],
    },
    packages: [
      {
        name: {
          type: String,
          unique: true,
          trim: true,
          required: [true, 'A package must have a name'],
          maxlength: [40, 'A package name cannot exceed 40 chracters'],
        },
        price: {
          type: Number,
          required: [true, 'A package must have a price'],
        },
        summary: {
          type: String,
          trim: true,
          required: [true, 'A package must have a summary'],
          maxlength: [100, 'A package summary cannot exceed 100 chracters'],
        },
        duration: {
          type: String,
          trim: true,
          required: [true, 'A package must have a duration'],
        },
        revisions: {
          type: Number,
          required: [true, 'A package must have number of revisions'],
        },
      },
    ],
    // category: {
    // type: mongoose.Schema.ObjectId,
    // ref: 'Category',
    // required: [true, 'A service must have a category'],
    // },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A service must belong to a user'],
    },
    images: [String],
    price: Number,
    duration: Number,
    slug: String,
    createdAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

serviceSchema.index({ price: 1, ratingsAverage: -1, duration: 1 });
serviceSchema.index({ slug: 1 }, { unique: true });

serviceSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'service',
  localField: '_id',
});

serviceSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  this.price = this.packages[0].price;
  this.duration = parseFloat(this.packages[0].duration);
  next();
});

serviceSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

// serviceSchema.pre(/^find/, function (next) {
// this.populate({
// path: 'category',
// select: 'name description',
// });
// next();
// });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
