const PostCategory = require('../models/postCategoryModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const handleFactory = require('./handleFactory');

exports.deletePostCategoryField = catchAsync(async (req, res, next) => {
  await Post.updateMany(
    {
      categories: { $in: [req.params.id] },
    },
    {
      $pull: { categories: req.params.id },
    },
  );
  next();
});

exports.getAllPostCategories = handleFactory.getAll(PostCategory);
exports.getPostCategory = handleFactory.getOne(PostCategory);
exports.createPostCategory = handleFactory.createOne(PostCategory);
exports.updatePostCategory = handleFactory.updateOne(PostCategory);
exports.deletePostCategory = handleFactory.deleteOne(PostCategory);
