const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    chatId: { type: String, required: true },
    senderId: { type: String, required: true },
    text: String,
    files: [
      {
        fileUrl: { type: String },
        fileType: { type: String, enum: ['image', 'pdf'] },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
