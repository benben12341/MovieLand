import config from 'config';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/UserModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.get('secrets.key'));

      if (!req.body.isAuthenticatedWithGoogle) {
        req.user = await User.findById(decoded.user._id).select('-password');
      } else {
        req.user = await User.findOne({ googleId: decoded.googleUserId });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Unauthorized, token is broken.');
    }
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(401);
    throw new Error('Unauthorized, token is missing.');
  }
});
