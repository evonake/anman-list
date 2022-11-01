import mongoose from 'mongoose';

const initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log('Connected to MongoDB');
    return mongoose.connection.getClient();
  } catch (error) {
    console.log(error);
    return process.exit(1);
  }
};

export default initDB;
