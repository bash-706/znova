const fs = require('fs').promises;
const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Service = require('../models/serviceModel');
const Review = require('../models/reviewModel');
const FAQ = require('../models/faqModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const handleFactory = require('./handleFactory');

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

exports.uploadServiceImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

// upload.array('images', 5);

exports.resizeServiceImages = catchAsync(async (req, res, next) => {
  // if (!req.files.imageCover && !req.files.images) return next();

  // Cover Image
  if (req?.files?.imageCover) {
    req.body.imageCover = req.params.id
      ? `service-${req.params.id}-${Date.now()}-cover.jpeg`
      : `service-${uuidv4()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(708, 427)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/services/${req.body.imageCover}`);
  }

  // Images
  if (req?.files?.images) {
    req.body.newImages = [];
    for (let i = 0; i < req.files.images.length; i++) {
      const file = req.files.images[i];
      const filename = req.params.id
        ? `service-${req.params.id}-${Date.now()}-image-${i + 1}.jpeg`
        : `service-${uuidv4()}-image-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2560, 1550)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/services/${filename}`);
      req.body.newImages.push(filename);
    }
  }
  next();
});

exports.handleServiceCreating = catchAsync(async (req, res, next) => {
  if (req.body.tags && !Array.isArray(req.body.tags)) {
    req.body.tags = req.body.tags.split(',');
  }

  if (req.body.packages) {
    req.body.packages = JSON.parse(req.body.packages);
  }

  if (req.body.body) {
    req.body.body = JSON.parse(req.body.body);
  }

  if (req.body.description) {
    req.body.description = JSON.parse(req.body.description);
  }

  if (req.body.newImages) {
    req.body.images = req.body.newImages;
  }

  if (req.body.images && typeof req.body.images === 'string') {
    req.body.images = JSON.parse(req.body.images);
  }

  next();
});

exports.handleServiceUpdating = catchAsync(async (req, res, next) => {
  if (req.body.tags && !Array.isArray(req.body.tags)) {
    req.body.tags = req.body.tags.split(',');
  }

  if (req.body.packages) {
    req.body.packages = JSON.parse(req.body.packages);
  }

  if (req.body.body) {
    req.body.body = JSON.parse(req.body.body);
  }

  if (req.body.description) {
    req.body.description = JSON.parse(req.body.description);
  }

  req.body.images = [];
  if (req.body.newImages) {
    req.body.images = req.body.newImages;
  }

  if (
    req.body.existingImages ||
    (req.body.newImages && req.body.existingImages)
  ) {
    req.body.existingImages = req.body.existingImages.map((img) => {
      const imgUrl = img.replace(/^"|"$/g, '');
      const parts = imgUrl.split('/');
      return parts[parts.length - 1];
    });

    req.body.existingImages.reverse().forEach((img) => {
      req.body.images.unshift(img);
    });
  }

  if (req.body.images) {
    req.body.images = req.body.images.filter((img) => img !== 'default.png');
  }

  next();
});

exports.aliasBestServices = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,-ratingsQuantity,price';
  next();
};

exports.setUserId = (req, res, next) => {
  // Allowing Nested Routes
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.getServiceBySlug = catchAsync(async (req, res, next) => {
  const service = await Service.findOne({ slug: req.params.slug }).populate({
    path: 'reviews user serviceCategory',
  });
  if (!service)
    return next(new AppError('Service you requested could not be found!'), 404);

  res.status(200).json({
    status: 'success',
    data: {
      service,
    },
  });
});

exports.getAllServices = handleFactory.getAll(
  Service,
  {
    path: 'user',
    select: 'name username photo',
  },
  {
    path: 'serviceCategory',
    select: 'name',
  },
);
exports.getService = handleFactory.getOne(
  Service,
  { path: 'reviews' },
  {
    path: 'user',
    select: 'name username photo',
  },
);
exports.createService = handleFactory.createOne(Service);
exports.updateService = handleFactory.updateOne(Service);

exports.deleteService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service)
    return next(new AppError('No document found with that id', 404));

  await Review.deleteMany({ service: service._id });
  await Order.deleteMany({ service: service._id });
  await FAQ.deleteMany({ serviceId: service._id });

  if (service.images.length) {
    for (const image of service.images) {
      await fs.unlink(`uploads/services/${image}`).catch(() => null);
    }
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
