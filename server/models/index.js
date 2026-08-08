import mongoose from 'mongoose'

const { Schema, model } = mongoose

/** A diploma department (mirrors src/data/departments.js). */
const DepartmentSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    code: String,
    cardTitle: String,
    pageTitle: String,
    navLabel: String,
    subtitle: String,
    description: String,
    vision: String,
    mission: String,
    peos: String,
    psos: String,
    image: String,
    intake: Number,
    direct2ndYear: Boolean,
    ring: String,
    accent: String,
    emailColor: String,
  },
  { timestamps: true }
)

/** A staff member (mirrors src/data/staff.js). */
const StaffMemberSchema = new Schema(
  {
    department: { type: String, required: true, index: true }, // department slug
    name: String,
    role: String,
    qualification: String,
    experience: String,
    email: String,
    image: String,
  },
  { timestamps: true }
)

/** A notice board entry (same shape as the external SPS API). */
const NoticeSchema = new Schema(
  {
    title: { type: String, required: true },
    fileUrl: String,
    uploadedAt: Date,
  },
  { timestamps: true }
)

/** A campus gallery photo (mirrors src/data/galleryPhotos.js). */
const GalleryPhotoSchema = new Schema(
  {
    src: { type: String, required: true, unique: true },
    caption: String,
    year: String,
  },
  { timestamps: true }
)

/** A governing body member (mirrors src/data/governingBody.js). */
const GoverningBodyMemberSchema = new Schema(
  {
    section: String, // "Governing Body" | "Local Government Body"
    photo: String,
    alt: String,
    name: String,
    designation: String,
  },
  { timestamps: true }
)

/** A recruiter logo in the homepage marquee (mirrors src/data/recruiters.js). */
const RecruiterSchema = new Schema(
  {
    name: String,
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

/** A hero slider image (mirrors the homepage slide sequence). */
const HeroSlideSchema = new Schema(
  {
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

/** A key/value site setting (ticker text, address, phones, timings, …). */
const SiteSettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: String,
  },
  { timestamps: true }
)

/** An editable content block: { page, key, value, type } — e.g. the About
 * page's history paragraph, the footer address, a page hero image. Every
 * visible text/image on the site is seeded as one of these. */
const ContentSchema = new Schema(
  {
    page: { type: String, required: true, index: true },
    key: { type: String, required: true },
    value: { type: String, default: '' },
    type: { type: String, default: 'text' }, // text | textarea | image
  },
  { timestamps: true }
)

export const Department = model('Department', DepartmentSchema)
export const StaffMember = model('StaffMember', StaffMemberSchema)
export const Notice = model('Notice', NoticeSchema)
export const GalleryPhoto = model('GalleryPhoto', GalleryPhotoSchema)
export const GoverningBodyMember = model('GoverningBodyMember', GoverningBodyMemberSchema)
export const Recruiter = model('Recruiter', RecruiterSchema)
export const HeroSlide = model('HeroSlide', HeroSlideSchema)
export const SiteSetting = model('SiteSetting', SiteSettingSchema)
export const Content = model('Content', ContentSchema)
