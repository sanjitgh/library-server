import mongoose from "mongoose";
import app from "./app";
import dotenv from 'dotenv';
var cors = require('cors')
dotenv.config();

const port = 5000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log('server error', error);
  }
}
main();
