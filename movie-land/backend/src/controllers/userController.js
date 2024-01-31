import config from 'config';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

import User from '../models/UserModel.js';
import { generateToken } from '../utils/generateToken.js';

const clientId =
  '640622037841-rmcrulj2s0ecud57vip8rvk9fjrfs225.apps.googleusercontent.com';
const googleClient = new OAuth2Client(clientId);

const getAll = ({ }, { }) => User.find();

const getById = ({ params: { id } }, { }) =>
  User.findById(id).select('-password');

const getUserProfile = async ({ user: { _id } }, res) => {
  const user = await User.findById(_id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: '/uploads/userImage.png',
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

const deleteUser = ({ params: { id } }, { }) => User.findByIdAndDelete(id);

const register = async ({ body }, { }) => {
  try {
    const userToCreate = new User(body);
    const newUser = await userToCreate.save();

    const token = jwt.sign({ user: newUser }, config.get('secrets.key'), {
      expiresIn: config.get('secrets.expiresIn'),
    });

    return { token, id: newUser.id, name: newUser.name };
  } catch (error) {
    console.error(error);
  }
};

const login = async ({ body }, res) => {
  const { email, password } = body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ user: user }, config.get('secrets.key'));

  return { token, id: user.id, name: user.name };
};

const googleLogin = async ({ body }, res) => {
  const { tokenId } = body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: clientId,
    });

    const { sub: googleUserId, email, name, picture } = ticket.getPayload();
    const googleUser = await User.findOne({ googleId: googleUserId });

    const token = jwt.sign(
      { googleUserId, email, name },
      config.get('secrets.key')
    );

    if (!googleUser) {
      const newUser = await new User({
        name: name,
        email: email,
        googleId: googleUserId,
        image: picture
      }).save();
      return { token, id: newUser._id, name: name, image: picture };
    }

    return { token, id: googleUser._id, name: name, image: picture };
  } catch (error) {
    console.error('Error during Google token verification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.body.user._id);

  if (user) {
    user.name = req.body.user.name || user.name;
    user.email = req.body.user.email || user.email;
    user.image = req.body.user.image || user.image;

    if (req.body.user.password) {
      user.password = req.body.user.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      image: updateUser.image,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

export {
  getAll,
  getById,
  getUserProfile,
  deleteUser,
  register,
  login,
  googleLogin,
  updateUserProfile,
};
