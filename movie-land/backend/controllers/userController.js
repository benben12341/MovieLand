const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateToken');
const { User } = require('../models/userModel');
const { initializeApp } = require('firebase/app');
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} = require('firebase/auth');
const { async } = require('@firebase/util');

const firebaseConfig = {
  apiKey: 'AIzaSyCPNO95RSWLHPDPTpcxm3i0xQ0MmWvOO1E',
  authDomain: 'book-store-4f2d6.firebaseapp.com',
  projectId: 'book-store-4f2d6',
  storageBucket: 'book-store-4f2d6.appspot.com',
  messagingSenderId: '1052931738305',
  appId: '1:1052931738305:web:866213b5e69db43a102240'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  signInWithEmailAndPassword(auth, email, password)
    .then(async userCredential => {
      // Signed in
      const firebaseUser = userCredential.user;
      const user = await User.findOne({ email });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(401);
      throw new Error('Invalid email or password');
    });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async userCredential => {
      // Signed in
      const firebaseUser = userCredential.user;

      const { name, email, password } = req.body;

      const user = await User.create({
        name,
        email,
        password
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id)
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500);
      throw new Error('failed register');
    });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   GET /api/users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
};
