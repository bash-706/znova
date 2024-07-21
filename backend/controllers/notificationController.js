const Notification = require('../models/notificationModel');
const catchAsync = require('../utils/catchAsync');

exports.getUnreadNotifications = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const notifications = await Notification.find({
    recipient: userId,
    read: false,
  }).sort({ createdAt: -1 });
  res.status(200).json({ status: 'success', notifications });
  res.status(500).json({ message: 'Server Error' });
});

exports.markAsRead = catchAsync(async (req, res, next) => {
  const notificationId = req.params.id;
  await Notification.findByIdAndUpdate(notificationId, { read: true });
  res
    .status(200)
    .json({ status: 'success', message: 'Notification marked as read' });
  res.status(500).json({ message: 'Server Error' });
});
