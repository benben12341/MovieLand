const express = require('express-async-router');

const {
  login,
  register,
  getUserProfile,
  // updateUserProfile,
  getAll,
  deleteUser,
  getById,
  // updateUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.AsyncRouter();

router.get('/', protect, admin, getAll);
router.get('/:id', protect, admin, getById);
router.get('/profile', protect, getUserProfile);

router.post('/', register);
router.post('/login', login);

// router.put('/profile', protect, updateUserProfile);
// router.put('/:id', protect, admin, updateUser);

router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
