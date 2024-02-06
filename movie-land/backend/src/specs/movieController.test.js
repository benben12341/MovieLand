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
  app = await startServer(9080);
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

describe('Movie routes', () => {
  afterEach(async () => {
    await Movie.deleteMany();
  });

  it('GET /api/movies should return all movies', async () => {
    const response = await request(app)
      .get('/api/movies')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
  });

  it('GET /api/movies/:id should return a movie by ID', async () => {
    const movie = new Movie(mockMovie);
    await movie.save();

    const response = await request(app)
      .get(`/api/movies/${movie._id}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
  });

  it('DELETE /api/movies/:id should delete a movie by ID', async () => {
    const movie = new Movie(mockMovie);
    await movie.save();

    const response = await request(app)
      .delete(`/api/movies/${movie._id}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
  });

  it('POST /api/movies should create a new movie', async () => {
    const response = await request(app)
      .post('/api/movies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockMovie);
    expect(response.status).toBe(201);
  });

  it('PUT /api/movies/:id should update a movie by ID', async () => {
    const movie = new Movie(mockMovie);
    await movie.save();

    const updatedMovieData = {
      name: 'Updated Movie',
      summary: 'Updated summary',
    };

    const response = await request(app)
      .put(`/api/movies/${movie._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedMovieData);

    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  it('POST /api/movies/:id/reviews should create a new review for a movie', async () => {
    const movie = new Movie(mockMovie);
    await movie.save();

    const reviewData = { rating: 5, comment: 'Great movie!' };

    const response = await request(app)
      .post(`/api/movies/${movie._id}/reviews`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ review: reviewData });

    expect(response.status).toBe(200);
    // Add more assertions as needed
  });
});
