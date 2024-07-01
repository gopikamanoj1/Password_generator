// db.connect.js


import mongoose from 'mongoose';

// Set the MongoDB connection options
mongoose.set('strictQuery', true);

const connectDB = async (config) => {
  try {
    await mongoose.connect(config.mongo.uri);
    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error.message);
    process.exit(1);
  }
};


export default connectDB;
