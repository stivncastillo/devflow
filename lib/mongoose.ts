import mongoose, { Mongoose } from "mongoose";

import "@/database";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "devflow",
      })
      .then((mongoose) => {
        console.log("MongoDB Connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("Error connecting to database: ", err);
        return err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
