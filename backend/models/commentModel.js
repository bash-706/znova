const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A comment must belong to a user.'],
    },
    text: {
      type: String,
      required: [true, 'A comment must have a text.'],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'A comment must belong to a post.'],
    },
    check: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
      default: null,
    },
    replyOnUser: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
