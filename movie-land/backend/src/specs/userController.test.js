import request from 'supertest';
import mongoose from 'mongoose';
import config from 'config';

import Movie from '../models/MovieModel.js';
import User from '../models/UserModel.js';
import { connectDB } from '../config/mongoose/index.js';
import startServer from '../config/express/index.js';

let app;
let accessToken;

const user = {
  name: 'ben siman tov',
  email: 'benpro@gmail.com',
  password: '123456',
};

beforeAll(async () => {
  const { address, name, query } = config.get('db');
  await connectDB(address, name, query);
  app = await startServer(9070);
  await Movie.deleteMany();

  await User.deleteOne({ email: user.email });
  await request(app).post('/api/users').send(user);
  const response = await request(app).post('/api/users/login').send(user);
  accessToken = response.body.token;
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
}, 10000);

describe('User Routes', () => {
  afterEach(async () => {
    await User.deleteOne({ email: 'john@example.com' });
  });
  it('GET /api/users should return all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
  });

  it('GET /api/users/:id should return a user by ID', async () => {
    const userId = '123'; // Replace with a valid user ID
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
  });

  it('GET /api/users/profile should return user profile', async () => {
    // You may need to set up authentication and provide a valid token for this test
    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
  });

  it('POST /api/users should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    const response = await request(app).post('/api/users').send(userData);
    expect(response.status).toBe(200);
  });

  it('POST /api/users/login should authenticate user', async () => {
    const userData = {
      email: 'choco@gmail.com',
      password: '123456',
    };

    const response = await request(app).post('/api/users/login').send(userData);
    expect(response.status).toBe(200);
  });

  it('PUT /api/users/profile should update user profile', async () => {
    // You may need to set up authentication and provide a valid token for this test
    const updatedData = {
      name: 'Updated Name',
      email: 'updated@example.com',
    };

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', 'Bearer YOUR_AUTH_TOKEN')
      .send(updatedData);
    expect(response.status).toBe(200);
  });

  it('DELETE /api/users/:id should delete user by ID', async () => {
    const userId = '123'; // Replace with a valid user ID
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(200);
  });
});
