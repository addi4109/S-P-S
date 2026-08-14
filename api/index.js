import app from '../server/index.js'
import { connectDB } from '../server/db.js'

let isConnected = false

export default async function (req, res) {
  if (!isConnected) {
    try {
      await connectDB()
      isConnected = true
      console.log('✔ MongoDB connected (Vercel Serverless)')
    } catch (err) {
      console.error('⚠ MongoDB not reachable:', err.message)
    }
  }
  
  // Forward the request to the Express app
  return app(req, res)
}
