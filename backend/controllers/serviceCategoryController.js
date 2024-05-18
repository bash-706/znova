const ServiceCategory = require('../models/serviceCategoryModel');
const Service = require('../models/serviceModel');
const catchAsync = require('../utils/catchAsync');
const handleFactory = require('./handleFactory');
const AppError = require('../utils/appError');

exports.deleteServiceCategoryField = catchAsync(async (req, res, next) => {
  const defaultCategory = await ServiceCategory.findOne({ slug: 'general' });

  if (!defaultCategory) {
    return next(new AppError('Default category not found', 404));
  }

  await Service.updateMany(
    {
      serviceCategory: req.params.id,
    },
    {
      $set: {
        serviceCategory: defaultCategory._id,
        category: defaultCategory.slug,
      },
    },
  );

  next();
});

exports.getAllServiceCategories = handleFactory.getAll(ServiceCategory);
exports.getServiceCategory = handleFactory.getOne(ServiceCategory);
exports.createServiceCategory = handleFactory.createOne(ServiceCategory);
exports.updateServiceCategory = handleFactory.updateOne(ServiceCategory);
exports.deleteServiceCategory = handleFactory.deleteOne(ServiceCategory);
