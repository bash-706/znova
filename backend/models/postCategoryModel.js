const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const postCategorySchema = new mongoose.Schema(
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

postCategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

const PostCategory = mongoose.model('PostCategory', postCategorySchema);

module.exports = PostCategory;
