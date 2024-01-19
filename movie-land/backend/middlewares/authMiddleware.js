const config = require('config');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const { User } = require('../models/UserModel');

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, config.get('secrets.key'));

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Unauthorized, token is broken.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Unauthorized, token is missing.');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Unauthorized, missing admin permission.');
  }
};

module.exports = { protect, admin };
