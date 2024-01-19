const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

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
      isAdmin: user.isAdmin,
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
      expiresIn: config.get('secrets.expiresIn'),
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

  return { token };
};

module.exports = {
  getAll,
  getById,
  getUserProfile,
  deleteUser,
  register,
  login,
};
