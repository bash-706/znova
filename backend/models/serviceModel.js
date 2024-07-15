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
      type: Object,
      required: [true, 'A post must have a body.'],
    },
    imageCover: {
      type: String,
      required: [true, 'A service must have a cover image'],
      default: 'default.png',
    },
    packages: [
      {
        name: {
          type: String,
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A service must belong to a user'],
    },
    serviceCategory: {
      type: mongoose.Schema.ObjectId,
      ref: 'ServiceCategory',
      required: [true, 'a service must belong to a category'],
    },
    category: String,
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
  this.slug = slugify(this.name, {
    lower: true,
  });
  this.price = this.packages[0].price;
  this.duration = parseFloat(this.packages[0].duration);
  if (this.images && this.images.length > 0) {
    this.imageCover = this.images[0];
  }
  next();
});

serviceSchema.pre('save', async function (next) {
  if (this.isModified('serviceCategory') || this.isNew) {
    const serviceCategory = await mongoose
      .model('ServiceCategory')
      .findById(this.serviceCategory);
    if (serviceCategory) {
      this.category = serviceCategory.slug;
    }
  }

  next();
});

serviceSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update.images && update.images.length > 0) {
    update.imageCover = update.images[0];
  }

  if (update.serviceCategory) {
    const serviceCategory = await mongoose
      .model('ServiceCategory')
      .findById(update.serviceCategory);
    if (serviceCategory) {
      update.category = serviceCategory.slug;
    }
  }
  next();
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
