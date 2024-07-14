import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.MONGODB_USER;
const pwd = process.env.MONGODB_PASSWORD;
const url = process.env.MONGODB_URL;
const db = process.env.MONGODB_DB;

const connectionURL = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Contacts`;

export async function initMongoConnection() {
  await mongoose
    .connect(connectionURL)
    .then(() => {
      console.log('Mongo connection successfully established!');
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}
