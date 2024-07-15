const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Service = require('../models/serviceModel');
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
    req.body.images = [];
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
      req.body.images.push(filename);
    }
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
    path: 'reviews user',
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
exports.deleteService = handleFactory.deleteOne(Service);
