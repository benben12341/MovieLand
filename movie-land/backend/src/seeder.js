import { users } from './data/users.js';
import config from 'config';
import { movies } from './data/movies.js';
import User from './models/UserModel.js';
import Movie from './models/MovieModel.js';
import { connectDB } from './config/mongoose/index.js';

const { address, name, query } = config.get('db');

connectDB(address, name, query);

export const importData = async () => {
  try {
    await Movie.deleteMany();
    await Movie.insertMany(movies);
    // await Movie.deleteMany()
    // await User.deleteMany()

    // const createdUsers = await User.insertMany(users)

    console.log('Data Imported!');
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Movie.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
