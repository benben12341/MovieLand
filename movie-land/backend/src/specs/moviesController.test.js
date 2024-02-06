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
  name: 'Alon Mantin',
  email: 'choco@gmail.com',
  password: '123456',
};

beforeAll(async () => {
  const { address, name, query } = config.get('db');
  await connectDB(address, name, query);
  app = await startServer();
  await Movie.deleteMany();

  await User.deleteMany({ email: user.email });
  await request(app).post('/api/users').send(user);
  const response = await request(app).post('/api/users/login').send(user);
  accessToken = response.body.token;
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
}, 10000);

const mockMovie = {
  id: 5,
  name: 'Wanted',
  image: '/uploads/5.jpg',
  genre: 'Action',
  summary:
    'Its plot revolves around Wesley Gibson (McAvoy), a frustrated account manager who discovers that he is the son of a professional assassin and decides to join the Fraternity, a secret society of assassins of which his father was a member.',
  rating: 10,
  director: 'Timur Bekmambetov',
  writer: 'Timur Bekmambetov',
  reviewsAmount: 0,
};

describe('Movie tests', () => {
  test('Test Post Movie', async () => {
    const response = await request(app)
      .post('/api/movies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockMovie);
    expect(response.statusCode).toBe(201);
  });
  test('Test Get All Movies - after insert', async () => {
    const response = await request(app)
      .get('/api/movies')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.movies.length).toBe(1);
  });
});
