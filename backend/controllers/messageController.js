const fs = require('fs').promises;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const Notification = require('../models/notificationModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError('Invalid file type. Only images and PDFs are allowed.', 400),
      false,
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadMessageFiles = upload.array('files', 3);

exports.processMessageFiles = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.body.files = [];

  await Promise.all(
    req.files.map(async (file) => {
      const fileExtension = file.mimetype.split('/')[1];
      const filename = `message-${uuidv4()}.${fileExtension}`;

      // Differentiate between images and PDFs
      if (file.mimetype.startsWith('image')) {
        await sharp(file.buffer)
          .resize(800, 600)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`uploads/messages/${filename}`);
      } else if (file.mimetype === 'application/pdf') {
        // Store PDF directly (no sharp processing)
        await fs.writeFile(`uploads/messages/${filename}`, file.buffer);
      }
      let fileType;
      if (file.mimetype.startsWith('image')) {
        fileType = file.mimetype.split('/')[0];
      }
      if (file.mimetype.startsWith('application')) {
        fileType = file.mimetype.split('/')[1];
      }

      req.body.files.push({
        fileUrl: filename,
        fileType,
      });
    }),
  );

  next();
});

exports.createMessage = catchAsync(async (req, res, next) => {
  const { chatId, senderId, text } = req.body;
  const files = req.body.files || [];

  const message = await Message.create({ chatId, senderId, text, files });

  await Chat.findByIdAndUpdate(chatId, { updatedAt: Date.now() });

  const chat = await Chat.findById(chatId);
  const recipientId = chat.members.find((id) => id.toString() !== senderId);

  await Notification.create({
    chat: chat._id,
    recipient: recipientId,
    sender: senderId,
    message: text || '',
  });

  res.status(201).json({ status: 'success', data: { message } });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatId });
  res.status(200).json({
    status: 'success',
    messages,
  });
});
