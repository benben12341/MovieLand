import asyncHandler from 'express-async-handler';
import Movie from '../models/MovieModel.js';

const getMovies = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const rating = req.query.rating
    ? {
        rating: {
          $eq: Number(req.query.rating),
        },
      }
    : {};

  const count = await Movie.countDocuments({
    ...keyword,
    ...rating,
  });
  const movies = await Movie.find({ ...keyword, ...rating });

  res.json({ movies });
});

const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'user',
      model: 'User',
    },
  });

  if (movie) {
    movie.reviews = movie.reviews.sort(
      (review1, review2) =>
        new Date(review2.createdAt) - new Date(review1.createdAt)
    );
    res.json(movie);
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    await movie.remove();
    res.json({ message: 'Movie removed' });
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

const createMovie = asyncHandler(async (req, res) => {
  const { body, user } = req;

  const movie = new Movie({ ...body, createdBy: user._id });

  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
});

const updateMovie = asyncHandler(async (req, res) => {
  const {
    body: { name, summary, image, director, writer, genre },
    params: { id },
  } = req;

  const movie = await Movie.findByIdAndUpdate(id, {
    name,
    summary,
    director,
    writer,
    genre,
  });

  res.json(movie);

  if (!movie) {
    res.status(404);
    throw new Error('Movie not found');
  }
});

const createMovieReview = asyncHandler(async (req, res) => {
  const {
    review: { rating, comment },
  } = req.body;
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    movie.reviews.push(review);

    movie.numReviews = movie.reviews.length;

    movie.rating =
      movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      movie.reviews.length;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } else {
    res.status(404);
    throw new Error('Movie not found');
  }
});

const getTopMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({}).sort({ rating: -1 }).limit(4);

  res.json(movies);
});

export {
  getMovies,
  getMovieById,
  deleteMovie,
  createMovie,
  updateMovie,
  createMovieReview,
  getTopMovies,
};