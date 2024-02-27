const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');

exports.createMessage = catchAsync(async (req, res, next) => {
  const { chatId, senderId, text } = req.body;
  const message = Message.create({ chatId, senderId, text });
  res.status(200).json({ status: 'success', message });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatId });
  res.status(200).json({
    status: 'success',
    messages,
  });
});
