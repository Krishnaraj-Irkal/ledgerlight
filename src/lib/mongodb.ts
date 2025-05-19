import mongoose from 'mongoose';

declare global {
  // allow global caching of the connection
  var _mongoose: typeof mongoose | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error('Please define MONGODB_URI');

let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = mongoose;
}

export async function connectDB() {
  if (cached!.connections[0].readyState) {
    return cached;
  }
  await mongoose.connect(MONGODB_URI);
  return cached;
}
