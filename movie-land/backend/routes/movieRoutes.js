const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovieById,
  deleteMovie,
  createMovie,
  updateMovie,
  createMovieReview,
  getTopMovies
} = require('../controllers/movieController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/', getMovies);
router.post('/', protect, admin, createMovie);
router.post('/:id/reviews', protect, createMovieReview);
router.get('/top', getTopMovies);
router.get('/:id', getMovieById);
router.delete('/:id', protect, admin, deleteMovie);
router.put('/:id', protect, admin, updateMovie);

module.exports = router;
