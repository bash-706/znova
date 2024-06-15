const FAQ = require('../models/faqModel');
const handleFactory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');

exports.getFaqsByService = catchAsync(async (req, res, next) => {
  const faqs = await FAQ.find({ serviceId: req.params.serviceId });

  res.status(200).json({
    status: 'success',
    results: faqs.length,
    data: {
      data: faqs,
    },
  });
});

exports.getAllFaqs = handleFactory.getAll(FAQ);
exports.getFaq = handleFactory.getOne(FAQ);
exports.createFaq = handleFactory.createOne(FAQ);
exports.updateFaq = handleFactory.updateOne(FAQ);
exports.deleteFaq = handleFactory.deleteOne(FAQ);
