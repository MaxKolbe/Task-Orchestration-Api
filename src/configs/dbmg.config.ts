import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connection.on('connected', () =>
  console.log(`Connected to the mongo database successfully`),
);

mongoose.connection.on('error', (err) =>
  console.log(`Database connection error: ${err} \n`),
);

const connectToDb = async () => {
  await mongoose.connect(process.env.DATABASE as string);
};

export default connectToDb;
