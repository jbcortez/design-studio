import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string);

    console.log("MongoDB connected");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);

      // Exit process with failure
      process.exit(1);
    }
  }
};
