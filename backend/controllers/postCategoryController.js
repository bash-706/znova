const PostCategory = require('../models/postCategoryModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const handleFactory = require('./handleFactory');
const AppError = require('../utils/appError');

exports.deletePostCategoryField = catchAsync(async (req, res, next) => {
  const defaultCategory = await PostCategory.findOne({ slug: 'general' });

  if (!defaultCategory) {
    return next(new AppError('Default category not found', 404));
  }

  await Post.updateMany(
    {
      postCategory: req.params.id,
    },
    {
      $set: {
        postCategory: defaultCategory._id,
        category: defaultCategory.slug,
      },
    },
  );

  next();
});

exports.getAllPostCategories = handleFactory.getAll(PostCategory);
exports.getPostCategory = handleFactory.getOne(PostCategory);
exports.createPostCategory = handleFactory.createOne(PostCategory);
exports.updatePostCategory = handleFactory.updateOne(PostCategory);
exports.deletePostCategory = handleFactory.deleteOne(PostCategory);
