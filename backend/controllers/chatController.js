const Chat = require('../models/chatModel');
const catchAsync = require('../utils/catchAsync');

exports.getUserChats = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const chats = await Chat.find({
    members: { $in: [userId] },
  });
  res.status(200).json({
    status: 'success',
    chats,
  });
});

exports.getUserChat = catchAsync(async (req, res, next) => {
  const { user1, user2 } = req.params;
  const chat = await Chat.find({
    members: { $all: [user1, user2] },
  });
  res.status(200).json({
    status: 'success',
    chat,
  });
});

exports.createChat = catchAsync(async (req, res, next) => {
  const { user1, user2 } = req.body;

  const chat = await Chat.findOne({
    members: { $all: [user1, user2] },
  });

  if (chat)
    return res.status(200).json({
      status: 'success',
      chat,
    });
  const newChat = await Chat.create({ members: [user1, user2] });

  res.status(200).json({
    status: 'success',
    chat: newChat,
  });
});
