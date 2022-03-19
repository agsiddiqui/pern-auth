import dotenv from 'dotenv';
import app from './server.js';

dotenv.config();

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
