/**
 * content — aggregated editable content blocks for every page.
 * Each page's blocks are created in a separate module under src/data/content/.
 * This file combines them into a single array for seeding into MongoDB.
 */
import { aboutContent } from './about.js'
import { admissionContent } from './admission.js'
import { contactContent } from './contact.js'
import { footerContent } from './footer.js'
import { grievanceContent } from './grievance.js'
import { headerContent } from './header.js'
import { homeContent } from './home.js'
import { placementContent } from './placement.js'
import { principalDeskContent } from './principalDesk.js'

export const contentBlocks = [
  ...aboutContent,
  ...admissionContent,
  ...contactContent,
  ...footerContent,
  ...grievanceContent,
  ...headerContent,
  ...homeContent,
  ...placementContent,
  ...principalDeskContent,
]
