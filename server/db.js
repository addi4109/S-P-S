import mongoose from 'mongoose'

/** Connects to MongoDB using the URI from process.env (set by dotenv). */
export async function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) throw new Error('MONGODB_URI is not set in .env')
  return mongoose.connect(uri, { serverSelectionTimeoutMS: 6000 })
}
