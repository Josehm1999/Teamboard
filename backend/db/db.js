import mongoose from 'mongoose';

const dbConnection = () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION);
    console.log('Connection established');
  } catch (e) {
    console.log('Connection failed!' + e);
  }
};

export default { dbConnection };
