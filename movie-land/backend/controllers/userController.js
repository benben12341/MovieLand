const config = require('config');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/UserModel');

const clientId =
  '640622037841-rmcrulj2s0ecud57vip8rvk9fjrfs225.apps.googleusercontent.com';
const googleClient = new OAuth2Client(clientId);

const getAll = ({}, {}) => User.find();

const getById = ({ params: { id } }, {}) =>
  User.findById(id).select('-password');

const getUserProfile = async ({ user: { _id } }, res) => {
  const user = await User.findById(_id);

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
};

const deleteUser = ({ params: { id } }, {}) => User.findByIdAndDelete(id);

const register = async ({ body }, {}) => {
  try {
    const userToCreate = new User(body);
    const newUser = await userToCreate.save();

    const token = jwt.sign({ user: newUser }, config.get('secrets.key'), {
      expiresIn: config.get('secrets.expiresIn')
    });

    return { token };
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
      audience: clientId
    });

    const { sub: googleUserId, email, name } = ticket.getPayload();
    const googleUser = await User.findOne({ googleId: googleUserId });

    if (!googleUser) {
      await new User({
        name: name,
        email: email,
        googleId: googleUserId,
      }).save();
    }

    const token = jwt.sign(
      { googleUserId, email, name },
      config.get('secrets.key')
    );

    return { token, id: googleUserId, name: name };
  } catch (error) {
    console.error('Error during Google token verification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.user.name || user.name;
    user.email = req.body.user.email || user.email;

    if (req.body.user.password) {
      user.password = req.body.user.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

module.exports = {
  getAll,
  getById,
  getUserProfile,
  deleteUser,
  register,
  login,
  googleLogin,
  updateUserProfile
};
