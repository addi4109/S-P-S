/**
 * footerContent — editable content blocks for the Footer.
 * Every visible string on src/components/layout/Footer.jsx lives here as a
 * block ({ page, key, value, type }); the footer reads them via
 * usePageContent('footer').
 */
export const footerContent = [
  // Banner image
  { page: 'footer', key: 'sataraImage', value: '/assets/images/satara.png', type: 'image' },
  { page: 'footer', key: 'sataraImageAlt', value: 'Satara', type: 'text' },

  // Tagline / socials
  { page: 'footer', key: 'experienceHeading', value: 'EXPERIENCE MORE.', type: 'text' },
  { page: 'footer', key: 'followUsLabel', value: 'FOLLOW US', type: 'text' },

  // Notice Board column
  { page: 'footer', key: 'noticeBoardHeading', value: 'Notice Board', type: 'text' },
  { page: 'footer', key: 'spsCampusLabel', value: 'SPS Campus :', type: 'text' },
  { page: 'footer', key: 'address', value: 'near NH - 4, near Khindwadi, Songaon, Maharashtra 415519', type: 'text' },

  // Quick Links column
  { page: 'footer', key: 'quickLinksHeading', value: 'Quick Links', type: 'text' },
  { page: 'footer', key: 'quickAbout', value: 'About', type: 'text' },
  { page: 'footer', key: 'quickDepartments', value: 'Departments', type: 'text' },
  { page: 'footer', key: 'quickAdmissions', value: 'Admissions', type: 'text' },
  { page: 'footer', key: 'quickPlacements', value: 'Placements', type: 'text' },

  // More Info column
  { page: 'footer', key: 'moreInfoHeading', value: 'More Info', type: 'text' },
  { page: 'footer', key: 'moreAdminLogin', value: 'Admin Login', type: 'text' },
  { page: 'footer', key: 'moreContactUs', value: 'Contact Us', type: 'text' },
  { page: 'footer', key: 'moreGrievancesCell', value: 'Grievances Cell', type: 'text' },

  // Bottom bar
  { page: 'footer', key: 'officeTimingsLabel', value: 'Office Timings:', type: 'text' },
  { page: 'footer', key: 'officeTimings', value: 'Monday to Friday | 10 am to 5 pm', type: 'text' },
  { page: 'footer', key: 'phones', value: '+91 94233 42843\n+91 9881726261', type: 'textarea' },
  { page: 'footer', key: 'copyright', value: 'All Rights Reserved © SPS, 2026', type: 'text' },
  { page: 'footer', key: 'builtByLabel', value: 'Built by', type: 'text' },
  { page: 'footer', key: 'builtBy', value: 'Galaxy Prime × SPS CO Dept', type: 'text' },
]
