import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    const url = process.env.DATABASEURL;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Db is Connect With Server');
  } catch (err) {
    console.log('Something Is Wrong With Db', err);
  }
};
export default dbConnection;
