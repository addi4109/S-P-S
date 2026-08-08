import 'dotenv/config'
import { connectDB } from './db.js'
import {
  Department,
  StaffMember,
  GalleryPhoto,
  GoverningBodyMember,
  Recruiter,
  HeroSlide,
  SiteSetting,
  Content,
} from './models/index.js'
import { departments } from '../src/data/departments.js'
import { staffByDepartment } from '../src/data/staff.js'
import { galleryPhotos } from '../src/data/galleryPhotos.js'
import { governingBodyMembers } from '../src/data/governingBody.js'
import { recruiterLogos } from '../src/data/recruiters.js'
import { heroSlides } from '../src/data/heroSlides.js'
import { siteSettingsList } from '../src/data/siteSettings.js'
import { contentBlocks } from '../src/data/content/index.js'

/** Idempotent upsert of many rows keyed by a natural field. */
async function upsertAll(model, rows, keyField, transform = (r) => r) {
  let updated = 0
  for (const row of rows) {
    const doc = transform(row)
    await model.updateOne({ [keyField]: doc[keyField] }, { $set: doc }, { upsert: true })
    updated++
  }
  return updated
}

/**
 * seedAll — uploads every site data module into MongoDB (idempotent).
 * Shared by the CLI (`npm run seed`) and the admin "Reset from static" button.
 */
export async function seedAll() {
  const staffRows = Object.entries(staffByDepartment).flatMap(([dept, members]) =>
    members.map((m) => ({ department: dept, ...m }))
  )

  const recruiterRows = recruiterLogos.map((logo, i) => ({
    image: typeof logo === 'string' ? logo : logo.src,
    name: typeof logo === 'object' ? (logo.name || '') : '',
    order: i,
  }))

  const counts = {
    departments: await upsertAll(Department, departments, 'slug'),
    staff: await upsertAll(StaffMember, staffRows, 'email'),
    gallery: await upsertAll(GalleryPhoto, galleryPhotos, 'src'),
    governingBody: await upsertAll(GoverningBodyMember, governingBodyMembers, 'name'),
    recruiters: await upsertAll(Recruiter, recruiterRows, 'image'),
    hero: await upsertAll(HeroSlide, heroSlides, 'image'),
    settings: await upsertAll(SiteSetting, siteSettingsList, 'key'),
    content: await upsertContent(),
  }

  return counts
}

/** Content blocks are unique by (page, key) — upsert on the pair. */
async function upsertContent() {
  let updated = 0
  for (const block of contentBlocks) {
    await Content.updateOne(
      { page: block.page, key: block.key },
      { $set: { page: block.page, key: block.key, value: block.value, type: block.type } },
      { upsert: true }
    )
    updated++
  }
  return updated
}

// CLI entry point: connect, seed, exit.
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('server/seed.js')) {
  try {
    await connectDB()
    const counts = await seedAll()
    console.log('✔ Seeded MongoDB:')
    for (const [name, count] of Object.entries(counts)) {
      console.log(`  ${name.padEnd(15)}: ${count}`)
    }
    console.log('Notices are managed live via the admin API.')
    process.exit(0)
  } catch (err) {
    console.error('Seed failed:', err.message)
    process.exit(1)
  }
}
