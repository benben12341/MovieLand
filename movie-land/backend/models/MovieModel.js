const mongoose = require('mongoose');
const { ReviewSchema } = require('./ReviewModel');

const movieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    director: {
      type: String,
      required: true
    },
    writer: {
      type: String,
      required: true
    },
    reviewsAmount: {
      type: Number,
      required: true,
      default: 0
    },
    reviews: [ReviewSchema],
    price: {
      type: Number,
      required: true,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie };
