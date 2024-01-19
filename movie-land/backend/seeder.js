const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { users } = require('./data/users');
const { movies } = require('./data/movies');
const { User } = require('./models/UserModel');
const { Movie } = require('./models/MovieModel');
const { Order } = require('./models/orderModel');
const { connectDB } = require('./config/db');
const browserObject = require('./scraper/browser');
const scraperController = require('./scraper/pageController');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Movie.deleteMany();
    await Movie.insertMany(movies);
    // await Order.deleteMany()
    // await Movie.deleteMany()
    // await User.deleteMany()

    // const createdUsers = await User.insertMany(users)

    // const adminUser = createdUsers[0]._id

    // let browserInstance = browserObject.startBrowser()
    // await scraperController(browserInstance)

    console.log('Data Imported!');
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
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

module.exports = {
  importData,
};
