const jwt = require('jsonwebtoken');
const config = require('config');

const generateToken = (id) => {
  return jwt.sign({ id }, config.get('secrets.key'), {
    expiresIn: '30d',
  });
};

module.exports = { generateToken };
