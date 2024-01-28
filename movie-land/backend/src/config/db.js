import config from 'config';
import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.get('db.address'));
    console.log(`MongoDB Connected: ${conn.connection.host} || ${config.get('db.address')}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
