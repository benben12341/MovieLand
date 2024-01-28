import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    _id: new mongoose.Types.ObjectId('65aed83aac93553ebeefc5d6'),
    name: 'Trung Hieu',
    email: 'hieu@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: new mongoose.Types.ObjectId('65aed83aac93553ebeefc5d7'),
    name: 'Alon Mantin',
    email: 'choco@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];
