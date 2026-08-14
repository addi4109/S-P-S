import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectDB } from './db.js'
import {
  Department,
  StaffMember,
  Notice,
  GalleryPhoto,
  GoverningBodyMember,
  Recruiter,
  HeroSlide,
  SiteSetting,
  Content,
} from './models/index.js'
import { createResourceRouter } from './resources.js'
import { seedAll } from './seed.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())
app.use(express.json())

/* ---------------------------------------------------------------- auth */

function verifyAdminPassword(plain) {
  // Prefer ADMIN_PASSWORD_HASH (bcrypt) if set, otherwise compare ADMIN_PASSWORD.
  if (process.env.ADMIN_PASSWORD_HASH) {
    return bcrypt.compareSync(plain || '', process.env.ADMIN_PASSWORD_HASH)
  }
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123'
  return plain === expectedPassword
}

function issueToken() {
  return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    next()
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

/** POST /api/login — admin authentication. Accepts `email` or `username`. */
app.post('/api/login', (req, res) => {
  const { username, password, email } = req.body || {}
  const identifier = username || email
  const expectedUsername = process.env.ADMIN_USERNAME || 'admin@gmail.com'

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  if (identifier !== expectedUsername || !verifyAdminPassword(password)) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }
  res.json({ token: issueToken(), user: { username: expectedUsername } })
})

/** GET /api/me — validate a stored token (used on admin page load). */
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ user: { username: process.env.ADMIN_USERNAME || 'admin@gmail.com' } })
})

/** GET /api/status — MongoDB + Cloudinary connectivity (used by the admin dashboard). */
app.get('/api/status', (_req, res) => {
  res.json({
    mongodb: mongoose.connection.readyState === 1,
    cloudinary: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
  })
})

/* ------------------------------------------------------------- notices */

/** GET /api/notices — public, newest first (same contract as the old SPS API). */
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ uploadedAt: -1 }).lean()
    res.json({ notices })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

/* -------------------------------------------------- site data + admin API */

/** GET /api/data — every site collection in one call. */
app.get('/api/data', async (_req, res) => {
  try {
    const [departments, staff, gallery, governingBody, notices, recruiters, hero, settings, content] =
      await Promise.all([
        Department.find().lean(),
        StaffMember.find().lean(),
        GalleryPhoto.find().lean(),
        GoverningBodyMember.find().lean(),
        Notice.find().lean(),
        Recruiter.find().lean(),
        HeroSlide.find().lean(),
        SiteSetting.find().lean(),
        Content.find().lean(),
      ])
    res.json({ departments, staff, gallery, governingBody, notices, recruiters, hero, settings, content })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

/* ------------------------------------------- generic CRUD + reset + upload */

// Reset all collections from the static data modules (admin "Reset from static").
app.post('/api/resources/reset', requireAuth, async (_req, res) => {
  try {
    const counts = await seedAll()
    res.json({ ok: true, counts })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Generic CRUD for every resource: /api/resources/:name[/:id]
app.use('/api/resources', createResourceRouter(requireAuth))

// Cloudinary upload (admin image uploads).
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'yjiggwb7',
  api_key: process.env.CLOUDINARY_API_KEY || '557523163286456',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'x0FtfpnYC88Dn2MbQfq-iBhwM1Y',
})

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
})

app.post('/api/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return res
      .status(503)
      .json({ message: 'Cloudinary is not configured — set CLOUDINARY_CLOUD_NAME in .env' })
  }
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  
  const isPdf = req.file.mimetype === 'application/pdf' || req.file.originalname?.toLowerCase().endsWith('.pdf')
  
  cloudinary.uploader.upload_stream(
    {
      folder: 'sps',
      resource_type: isPdf ? 'raw' : 'auto',
    },
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message })
      res.json({ url: result.secure_url, publicId: result.public_id })
    }
  ).end(req.file.buffer)
})

/* ----------------------------------------------------------- production */

// Serve the built React app when present (npm run build && npm run dev:server).
const dist = path.join(__dirname, '..', 'dist')
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(dist))
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await connectDB()
    console.log('✔ MongoDB connected')
  } catch (e) {
    console.warn('⚠ MongoDB not reachable — API starts without DB:', e.message)
  }
  app.listen(PORT, () => {
    console.log(`✔ API listening on http://localhost:${PORT}`)
  })
}

if (!process.env.VERCEL) {
  start()
}

export default app
