const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must have a title.'],
    },
    caption: {
      type: String,
      required: [true, 'A post must have a caption.'],
    },
    body: {
      type: Object,
      // required: [true, 'A post must have a body.'],
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A post must have a user.'],
    },
    tags: [
      {
        type: String,
      },
    ],
    categories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'PostCategory',
        // required: [true, 'A post must belong to a category.'],
      },
    ],
    slug: String,
    createdAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// postSchema.index({ slug: 1 }, { unique: true });

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

postSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
  });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
