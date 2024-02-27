const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const handleFactory = require('./handleFactory');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload images only.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPostImage = upload.single('image');

exports.resizePostImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = req.params.id
    ? `post-${req.params.id}-${Date.now()}-cover.jpeg`
    : `post-${uuidv4()}-cover.jpeg`;
  req.body.image = req.file.filename;
  await sharp(req.file.buffer)
    .resize(2560, 1550)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/posts/${req.file.filename}`);
  next();
});

exports.setUserId = (req, res, next) => {
  // Allowing Nested Routes
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.aliasLatestPosts = (req, res, next) => {
  req.query.limit = '6';
  req.query.sort = '-createdAt';
  next();
};

exports.getPostBySlug = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate([
    {
      path: 'user',
      select: 'name username photo',
    },
    {
      path: 'comments',
      match: {
        check: true,
        parent: null,
      },
      populate: [
        {
          path: 'user',
          select: 'name username photo',
        },
        {
          path: 'replies',
          match: {
            check: true,
          },
          populate: [
            {
              path: 'user',
              select: 'name username photo',
            },
          ],
        },
      ],
    },
  ]);
  if (!post)
    return next(new AppError('The requested article could not be found!'), 404);

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.getAllPosts = handleFactory.getAll(Post, {
  path: 'user',
  select: 'name username photo',
});

exports.getPost = handleFactory.getOne(
  Post,
  {
    path: 'user',
    select: 'name username photo',
  },
  {
    path: 'comments',
    match: {
      check: true,
      parent: null,
    },
    populate: [
      {
        path: 'user',
        select: 'name username photo',
      },
      {
        path: 'replies',
        match: {
          check: true,
        },
      },
    ],
  },
);
exports.createPost = handleFactory.createOne(Post);
exports.updatePost = handleFactory.updateOne(Post);

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(new AppError('No document found with that id', 404));
  }

  await Comment.deleteMany({ post: post._id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
