import express from 'express-async-router';

import {
  login,
  googleLogin,
  register,
  getUserProfile,
  updateUserProfile,
  getAll,
  deleteUser,
  getById,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.AsyncRouter();

router.get('/', protect, getAll);
router.get('/:id', getById);
router.get('/profile', protect, getUserProfile);

router.post('/', register);
router.post('/login', login);
router.post('/googleLogin', googleLogin);

router.put('/profile', updateUserProfile);

router.delete('/:id', protect, deleteUser);

export default router;
