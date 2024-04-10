const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = (Model, ...popOptions) =>
  catchAsync(async (req, res, next) => {
    const filter = req.params.serviceId
      ? { service: req.params.serviceId }
      : {};

    // Executing Query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .paginate()
      .search();

    if (popOptions.length === 1)
      features.query = features.query.populate(popOptions[0]);
    else
      features.query = features.query
        .populate(popOptions[0])
        .populate(popOptions[1]);

    const docs = await features.query;

    const totalDocsQuery = Model.find(filter);
    const totalDocs = await new APIFeatures(totalDocsQuery, req.query)
      .filter()
      .sort()
      .limit()
      .search()
      .query.countDocuments();

    // const totalDocs = await Model.countDocuments();

    res.status(200).json({
      status: 'success',
      results: docs.length,
      totalDocs,
      data: {
        data: docs,
      },
    });
  });

exports.getOne = (Model, ...popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions.length === 1) query = query.populate(popOptions[0]);
    else query = query.populate(popOptions[0]).populate(popOptions[1]);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
