import { departments } from './departments.js'
import { staffByDepartment } from './staff.js'
import { galleryPhotos } from './galleryPhotos.js'
import { governingBodyMembers } from './governingBody.js'
import { recruiterLogos } from './recruiters.js'
import { heroSlides } from './heroSlides.js'
import { siteSettingsList } from './siteSettings.js'
import { contentBlocks } from './content/index.js'

/**
 * staticFallbacks — maps each admin resource name to the src/data module that
 * stands in when MongoDB is unreachable. `staff` is flattened to an array of
 * { department, ...member } rows so the admin table and API shape match.
 */
export const staticFallbacks = {
  departments,
  staff: Object.entries(staffByDepartment).flatMap(([dept, members]) =>
    members.map((m) => ({ department: dept, ...m }))
  ),
  gallery: galleryPhotos,
  governingBody: governingBodyMembers,
  notices: [],
  recruiters: recruiterLogos.map((logo, i) => ({
    image: typeof logo === 'string' ? logo : logo.src,
    name: typeof logo === 'object' ? logo.name || '' : '',
    order: i,
  })),
  hero: heroSlides,
  settings: siteSettingsList,
  content: contentBlocks,
}
