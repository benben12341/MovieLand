import asyncHandler from 'express-async-handler';
import Message from '../models/MessageModel.js';

const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({});
  res.json({ messages });
});

const createMessage = async (message) => {
  const newMessage = new Message({
    text: message.text,
    sender: message.sender,
    senderName: message.senderName,
  });

  await newMessage.save();
};

export { getMessages, createMessage };
