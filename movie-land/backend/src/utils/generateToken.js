import jwt from 'jsonwebtoken';
import config from 'config';

export const generateToken = (id) => {
  return jwt.sign({ id }, config.get('secrets.key'), {
    expiresIn: '30d',
  });
};
