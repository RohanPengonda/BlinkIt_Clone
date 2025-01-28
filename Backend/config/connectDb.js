import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.MONGODB_URI) {
  throw new Error("Plese provide MONGODB_URI in the .env file")
}
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connect DB")
  } catch (error) {
    console.log("MongoDb Connect error", error)
    process.exit(1)
  }
}


export default connectDB