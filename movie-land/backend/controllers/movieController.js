const asyncHandler = require("express-async-handler");
const { Movie } = require("../models/MovieModel");

// @desc    Fetch all movies
// @route   GET /api/movies
// @access  Public
const getMovies = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const maxPrice = req.query.maxPrice
    ? {
        price: {
          $lte: Number(req.query.maxPrice),
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
    ...maxPrice,
    ...rating,
  });
  const movies = await Movie.find({ ...keyword, ...maxPrice, ...rating });

  res.json({ movies });
});

// @desc    Fetch single movie
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      path: "user",
      model: "User",
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
    throw new Error("Movie not found");
  }
});

// @desc    Delete a Movie
// @route   GET /api/movies/:id
// @access  Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    await movie.remove();
    res.json({ message: "Movie removed" });
  } else {
    res.status(404);
    throw new Error("Movie not found");
  }
});

// @desc    Create a Movie
// @route   POST /api/movies
// @access  Private/Admin
const createMovie = asyncHandler(async (req, res) => {
  const { body, user } = req;

  const movie = new Movie({ ...body, createdBy: user._id });

  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
});

// @desc    Update a Movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
const updateMovie = asyncHandler(async (req, res) => {
  const { name, price, description, image, author, genre, countInStock } =
    req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    movie.name = name;
    movie.price = price;
    movie.description = description;
    movie.image = image;
    movie.author = author;
    movie.genre = genre;
    movie.countInStock = countInStock;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } else {
    res.status(404);
    throw new Error("Movie not found");
  }
});

// @desc    Create new review
// @route   POST /api/movies/:id/reivew
// @access  Private
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
    throw new Error("Movie not found");
  }
});

// @desc    Get top rated movies
// @route   POST /api/movies/top
// @access  Public
const getTopMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({}).sort({ rating: -1 }).limit(4);

  res.json(movies);
});

module.exports = {
  getMovies,
  getMovieById,
  deleteMovie,
  createMovie,
  updateMovie,
  createMovieReview,
  getTopMovies,
};
