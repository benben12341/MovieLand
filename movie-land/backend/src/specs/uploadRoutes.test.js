import request from 'supertest';
import mongoose from 'mongoose';
import config from 'config';

import { connectDB } from '../config/mongoose/index.js';
import startServer from '../config/express/index.js';

let app;

beforeAll(async () => {
  const { address, name, query } = config.get('db');
  await connectDB(address, name, query);
  app = await startServer(9040);
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
}, 10000);

describe('File Upload Router', () => {
  it('should upload a file successfully', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('image', Buffer.from(''), {
        filename: 'test.jpg',
        contentType: 'image/jpeg',
      });

    expect(response.status).toBe(200);
  });

  it('should handle invalid file types', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('image', Buffer.from(''), {
        filename: 'test.txt',
        contentType: 'text/plain',
      });

    expect(response.text).toContain('Invalid file type');
  });
});
