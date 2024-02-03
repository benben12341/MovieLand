import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export const connectDB = async (address, name, query) => {
  try {
    const connectionString = `${address}/${name}`;
    const conn = await mongoose.connect(connectionString);
    console.log(
      `MongoDB Connected: ${conn.connection.host} || ${connectionString}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
