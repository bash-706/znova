const Comment = require('../models/commentModel');
const handleFactory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Post = require('../models/postModel');

exports.createComment = catchAsync(async (req, res, next) => {
  const { text, slug, parent, replyOnUser } = req.body;
  const post = await Post.findOne({ slug });

  if (!post) return next(new AppError('Article not found!'), 404);
  const comment = await Comment.create({
    user: req.user._id,
    text,
    post: post.id,
    parent,
    replyOnUser,
  });

  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  await Comment.deleteMany({ parent: comment._id });

  if (!comment) {
    return next(new AppError('No comment found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.checkToFalse = (req, res, next) => {
  if (req.body.check) return next();
  req.body.check = false;
  next();
};

exports.getAllComments = handleFactory.getAll(
  Comment,
  {
    path: 'post',
    select: 'title image slug',
  },
  {
    path: 'user',
    select: 'name username',
  },
);
exports.getComment = handleFactory.getOne(Comment);
exports.updateComment = handleFactory.updateOne(Comment);
