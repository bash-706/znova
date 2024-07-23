const Notification = require('../models/notificationModel');
const catchAsync = require('../utils/catchAsync');

exports.getUnreadNotifications = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const notifications = await Notification.find({
    recipient: userId,
  }).sort({ createdAt: -1 });
  res.status(200).json({ status: 'success', notifications });
});

exports.markAsRead = catchAsync(async (req, res, next) => {
  const notificationId = req.params.id;
  await Notification.findByIdAndDelete(notificationId);
  res.status(200).json({ status: 'success' });
});
