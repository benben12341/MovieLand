const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    sender: {
      type: String,
      required: true
    },
    senderName: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message };
