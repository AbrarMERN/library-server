import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import libraryRouter from './router/libraryRouter.js';
dotenv.config();
dbConnection();
const port = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Request-With,Content-Type,Accept,Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  next();
});
app.use('/api/library', libraryRouter);
app.listen(port, () => {
  console.log(`Server Is Runnig On Port ${port}`);
});
