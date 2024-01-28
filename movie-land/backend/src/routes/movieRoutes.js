import express from 'express';
import {
  getMovies,
  getMovieById,
  deleteMovie,
  createMovie,
  updateMovie,
  createMovieReview,
  getTopMovies,
} from '../controllers/movieController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getMovies);
router.post('/', protect, createMovie);
router.post('/:id/reviews', protect, createMovieReview);
router.get('/top', getTopMovies);
router.get('/:id', getMovieById);
router.delete('/:id', protect, deleteMovie);
router.put('/:id', protect, updateMovie);

export default router;
