const mongoose = require('mongoose');

const postCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A category must have a name'],
    },
  },
  {
    timestamps: true,
  },
);

const PostCategory = mongoose.model('PostCategory', postCategorySchema);

module.exports = PostCategory;
