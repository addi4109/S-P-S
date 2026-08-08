/**
 * headerContent — editable content blocks for the Header (and mobile drawer).
 * Every visible string on src/components/layout/Header.jsx and
 * src/components/layout/MobileDrawer.jsx lives here as a block
 * ({ page, key, value, type }); the components read them via
 * usePageContent('header').
 *
 * NOTE: the departments dropdown labels (Computer Engineering, ENTC, …) come
 * from the departments resource (src/data/departments.js), so they are NOT
 * duplicated here.
 */
export const headerContent = [
  // Logo
  { page: 'header', key: 'logo', value: '/assets/images/logo.jpg', type: 'image' },
  { page: 'header', key: 'logoAlt', value: 'Satara Logo', type: 'text' },
  { page: 'header', key: 'logoAltMobile', value: 'Logo', type: 'text' },

  // College / society names
  { page: 'header', key: 'collegeName', value: 'Satara Polytechnic Satara, Satara', type: 'text' },
  { page: 'header', key: 'collegeShortName', value: 'Satara Polytechnic', type: 'text' },

  // Menu buttons
  { page: 'header', key: 'openMenuLabel', value: 'Open menu', type: 'text' },
  { page: 'header', key: 'closeMenuLabel', value: 'Close menu', type: 'text' },

  // About dropdown items
  { page: 'header', key: 'aboutAbout', value: 'About SPS', type: 'text' },
  { page: 'header', key: 'aboutPrincipalDesk', value: "Principal's Desk", type: 'text' },

  // Top-level nav labels (department dropdown items come from the departments resource)
  { page: 'header', key: 'navHome', value: 'Home', type: 'text' },
  { page: 'header', key: 'navAboutUs', value: 'About Us', type: 'text' },
  { page: 'header', key: 'navGoverningBody', value: 'Governing Body', type: 'text' },
  { page: 'header', key: 'navDepartments', value: 'Departments', type: 'text' },
  { page: 'header', key: 'navGallery', value: 'Gallery', type: 'text' },
  { page: 'header', key: 'navPlacement', value: 'Placement', type: 'text' },
  { page: 'header', key: 'navGrievances', value: 'Grievances', type: 'text' },
  { page: 'header', key: 'navAdmission', value: 'Admission Process', type: 'text' },
  { page: 'header', key: 'navNotice', value: 'Notice', type: 'text' },
  { page: 'header', key: 'navContact', value: 'Contact', type: 'text' },
]
