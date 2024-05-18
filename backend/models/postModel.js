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
      required: [true, 'A post must have a body.'],
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
    postCategory: {
      type: mongoose.Schema.ObjectId,
      ref: 'PostCategory',
      required: [true, 'a post must belong to a category'],
    },
    category: String,
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

postSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
  }

  this.slug = slugify(this.title, {
    lower: true,
  });

  if (this.isModified('postCategory') || this.isNew) {
    const postCategory = await mongoose
      .model('PostCategory')
      .findById(this.postCategory);
    if (postCategory) {
      this.category = postCategory.slug;
    }
  }

  next();
});

postSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update.postCategory) {
    const postCategory = await mongoose
      .model('PostCategory')
      .findById(update.postCategory);
    if (postCategory) {
      update.category = postCategory.slug;
    }
  }

  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
