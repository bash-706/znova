const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const serviceCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'A category must have a name.'],
    },
    slug: String,
  },
  {
    timestamps: true,
  },
);

serviceCategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

const ServiceCategory = mongoose.model(
  'ServiceCategory',
  serviceCategorySchema,
);

module.exports = ServiceCategory;
