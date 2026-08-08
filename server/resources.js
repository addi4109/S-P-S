import { Router } from 'express'
import {
  Department,
  StaffMember,
  GalleryPhoto,
  GoverningBodyMember,
  Notice,
  Recruiter,
  HeroSlide,
  SiteSetting,
  Content,
} from './models/index.js'

/**
 * Generic resource registry. Each entry maps a URL resource name to its
 * Mongoose model plus a server-side field allowlist and type coercions.
 * The front-end mirrors this in src/config/resources.js (labels/types).
 */
const RESOURCES = {
  departments: {
    model: Department,
    fields: ['slug', 'code', 'cardTitle', 'pageTitle', 'navLabel', 'subtitle', 'description', 'vision', 'mission', 'peos', 'psos', 'image', 'intake', 'direct2ndYear', 'ring', 'accent', 'emailColor'],
    types: { intake: 'number', direct2ndYear: 'boolean' },
  },
  staff: {
    model: StaffMember,
    fields: ['department', 'name', 'role', 'qualification', 'experience', 'email', 'image'],
    types: {},
  },
  gallery: {
    model: GalleryPhoto,
    fields: ['src', 'caption', 'year'],
    types: {},
  },
  governingBody: {
    model: GoverningBodyMember,
    fields: ['section', 'photo', 'alt', 'name', 'designation'],
    types: {},
  },
  notices: {
    model: Notice,
    fields: ['title', 'fileUrl', 'uploadedAt'],
    types: { uploadedAt: 'date' },
  },
  recruiters: {
    model: Recruiter,
    fields: ['name', 'image', 'order'],
    types: { order: 'number' },
  },
  hero: {
    model: HeroSlide,
    fields: ['image', 'order', 'active'],
    types: { order: 'number', active: 'boolean' },
  },
  settings: {
    model: SiteSetting,
    fields: ['key', 'value'],
    types: {},
  },
  content: {
    model: Content,
    fields: ['page', 'key', 'value', 'type'],
    types: {},
  },
}

function coerceTypes(types, body) {
  const out = {}
  for (const [key, type] of Object.entries(types)) {
    if (body[key] === undefined || body[key] === null) continue
    if (type === 'number') out[key] = Number(body[key])
    else if (type === 'boolean') out[key] = Boolean(body[key])
    else if (type === 'date') out[key] = body[key] ? new Date(body[key]) : null
  }
  return out
}

function pickFields(fields, body) {
  const out = {}
  for (const field of fields) {
    if (body[field] !== undefined) out[field] = body[field]
  }
  return out
}

/**
 * createResourceRouter — REST router for all editable collections.
 * Mounted at /api/resources/:name.
 */
export function createResourceRouter(requireAuth) {
  const router = Router()

  // Public read
  router.get('/:name', async (req, res) => {
    const cfg = RESOURCES[req.params.name]
    if (!cfg) return res.status(404).json({ message: 'Unknown resource' })
    try {
      const docs = await cfg.model.find().sort({ order: 1, createdAt: 1 }).lean()
      res.json(docs)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  })

  router.get('/:name/:id', async (req, res) => {
    const cfg = RESOURCES[req.params.name]
    if (!cfg) return res.status(404).json({ message: 'Unknown resource' })
    try {
      const doc = await cfg.model.findById(req.params.id).lean()
      if (!doc) return res.status(404).json({ message: 'Not found' })
      res.json(doc)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  })

  // Authenticated writes
  router.post('/:name', requireAuth, async (req, res) => {
    const cfg = RESOURCES[req.params.name]
    if (!cfg) return res.status(404).json({ message: 'Unknown resource' })
    const data = { ...coerceTypes(cfg.types, req.body), ...pickFields(cfg.fields, req.body) }
    if (!Object.keys(data).length) return res.status(400).json({ message: 'No valid fields provided' })
    try {
      const doc = await cfg.model.create(data)
      res.status(201).json(doc)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  })

  router.put('/:name/:id', requireAuth, async (req, res) => {
    const cfg = RESOURCES[req.params.name]
    if (!cfg) return res.status(404).json({ message: 'Unknown resource' })
    const data = { ...coerceTypes(cfg.types, req.body), ...pickFields(cfg.fields, req.body) }
    try {
      const doc = await cfg.model
        .findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
        .lean()
      if (!doc) return res.status(404).json({ message: 'Not found' })
      res.json(doc)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  })

  router.delete('/:name/:id', requireAuth, async (req, res) => {
    const cfg = RESOURCES[req.params.name]
    if (!cfg) return res.status(404).json({ message: 'Unknown resource' })
    try {
      await cfg.model.findByIdAndDelete(req.params.id)
      res.json({ ok: true })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  })

  return router
}
