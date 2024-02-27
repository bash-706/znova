// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'category must have a name'],
//       unique: true,
//       trim: true,
//       lowercase: true,
//       minlength: [3, 'category name must be 3 chracters long'],
//       maxlength: [50, 'category name cannot exceed 50 chracters'],
//     },
//     description: {
//       type: String,
//       trim: true,
//       maxlength: [200, 'category description cannot exceed 200 chracter'],
//     },
//     createdAt: Date,
//   },
//   {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   },
// );

// categorySchema.virtual('services', {
//   ref: 'Service',
//   foreignField: 'category',
//   localField: '_id',
// });

// categorySchema.pre('save', function (next) {
//   this.createdAt = Date.now();
//   next();
// });

// const Category = mongoose.model('Category', categorySchema);

// module.exports = Category;
