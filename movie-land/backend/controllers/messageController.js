const asyncHandler = require('express-async-handler');
const { Message } = require('../models/MessageModel');

// @desc    Fetch all messages
// @route   GET /api/messages
// @access  Public
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({});
  res.json({ messages });
});

// @desc    Post a Message
// @route   POST /api/message/
const createMessage = async message => {
  const newMessage = new Message({
    text: message.text,
    sender: message.sender,
    senderName: message.senderName
  });

  await newMessage.save();
};

module.exports = {
  getMessages,
  createMessage
};
