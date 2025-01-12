import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const password = encodeURIComponent(process.env.PASSWORD);
const DBname = process.env.DBNAME;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://elfatehon14:${password}@busadoon.sxq7h.mongodb.net/?retryWrites=true&w=majority&appName=${DBname}`
    );

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error}`);
    process.exit(1);
  }
};
export default connectDB;
