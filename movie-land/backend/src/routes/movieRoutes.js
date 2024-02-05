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
// Swagger documentation for the movie routes
/**
 * @swagger
 * /movies:
 *   get:
 *     summary: "Get all movies"
 *     tags:
 *       - movies
 *     responses:
 *       '200':
 *         description: "List of movies"
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/components/schemas/Movie"
 *   post:
 *     summary: "Create a new movie"
 *     tags:
 *       - movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Movie"
 *     responses:
 *       '201':
 *         description: "Movie created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Movie"
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: "Get a movie by ID"
 *     tags:
 *       - movies
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the movie to retrieve"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: "Movie details"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Movie"
 *   put:
 *     summary: "Update a movie by ID"
 *     tags:
 *       - movies
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the movie to update"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Movie"
 *     responses:
 *       '200':
 *         description: "Movie updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Movie"
 *   delete:
 *     summary: "Delete a movie by ID"
 *     tags:
 *       - movies
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the movie to delete"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: "Movie deleted successfully"
 */

/**
 * @swagger
 * /movies/{id}/reviews:
 *   get:
 *     summary: "Get all reviews for a movie"
 *     tags:
 *       - reviews
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the movie to retrieve reviews for"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: "List of reviews for the movie"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Review"
 *   post:
 *     summary: "Post a review for a movie"
 *     tags:
 *       - reviews
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the movie to post a review for"
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Review"
 *     responses:
 *       '201':
 *         description: "Review posted successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Review"
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *         image:
 *           type: string
 *           format: url
 *         genre:
 *           type: string
 *         summary:
 *           type: string
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 10
 *         writer:
 *           type: string
 *         amount:
 *           type: integer
 *         reviews:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Review"
 *         createdBy:
 *           type: string
 *       required:
 *         - id
 *         - name
 *         - genre
 *         - summary
 *         - rating
 *         - writer
 *         - amount
 *         - reviews
 *         - createdBy
 *       additionalProperties: false
 *       xml:
 *         name: Movie
 *       example:
 *         id: 1
 *         name: The Shawshank Redemption
 *         image: "https://example.com/shawshank_redemption.jpg"
 *         genre: Drama
 *         summary: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
 *         rating: 9.3
 *         writer: "Stephen King (short story \"Rita Hayworth and Shawshank Redemption\"), Frank Darabont (screenplay)"
 *         amount: 2456
 *         reviews:
 *           - id: 1
 *             rating: 10
 *             comment: "One of the best movies I've ever seen!"
 *             user: "JohnDoe123"
 *           - id: 2
 *             rating: 9
 *             comment: "Absolutely fantastic."
 *             user: "JaneSmith456"
 *         createdBy: AdminUser123
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 10
 *         comment:
 *           type: string
 *         user:
 *           type: string
 *       required:
 *         - id
 *         - rating
 *         - comment
 *         - user
 *       additionalProperties: false
 *       xml:
 *         name: Review
 *       example:
 *         id: 1
 *         rating: 9.5
 *         comment: "This movie was amazing!"
 *         user: "JohnDoe123"
 */

