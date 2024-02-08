import request from 'supertest';
import mongoose from 'mongoose';
import config from 'config';

import Message from '../models/MessageModel.js';
import { connectDB } from '../config/mongoose/index.js';
import startServer from '../config/express/index.js';

beforeAll(async () => {
  const { address, name, query } = config.get('db');
  await connectDB(address, name, query);
  app = await startServer(9060);
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
}, 10000);

describe('Message Controller', () => {
  describe('GET /api/messages should return all messages', () => {
    it('should return all messages', async () => {
      const response = await request(app).get('/api/messages');

      expect(response.body.messages.length).toBeGreaterThan(0);
      expect(response.status).toBe(200);
    });
  });

  describe('createMessage', () => {
    it('should create a new message', async () => {
      const mockMessage = {
        text: 'Test message',
        sender: 'user2',
        senderName: 'User Two',
      };
      const newMessage = new Message(mockMessage);

      await newMessage.save();

      const response = await request(app).get('/api/messages');
      const { text, sender, senderName } = response.body.messages.pop();
      expect({ text, sender, senderName }).toMatchSnapshot(mockMessage);
    });
  });
});
