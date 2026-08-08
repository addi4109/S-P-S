/**
 * Editable content blocks for the Principal's Desk page.
 * Shape: { page, key, value, type } where type is 'text' (short single-line),
 * 'textarea' (paragraphs/multi-line), or 'image' (URLs).
 */
export const principalDeskContent = [
  // Headings
  { page: 'principalDesk', key: 'heroHeading', value: 'Principal’s Desk', type: 'text' },
  { page: 'principalDesk', key: 'sectionHeading', value: 'Message from the Principal', type: 'text' },

  // Principal photo
  { page: 'principalDesk', key: 'principalImage', value: '/assets/images/principal.jpg', type: 'image' },
  { page: 'principalDesk', key: 'principalAlt', value: 'Principal', type: 'text' },

  // Message paragraphs
  { page: 'principalDesk', key: 'message1', value: 'Welcome to our institution, a place where tradition meets excellence and education is shaped with values, discipline, and integrity. Our college stands as a pillar of academic distinction, nurturing young minds to become responsible professionals and conscientious citizens.', type: 'textarea' },
  { page: 'principalDesk', key: 'message2', value: 'We believe education is not merely the acquisition of knowledge, but the cultivation of character, leadership, and lifelong learning. Through dedicated faculty, modern infrastructure, and a student-centered approach, we strive to prepare our students for global challenges.', type: 'textarea' },
  { page: 'principalDesk', key: 'message3', value: 'I invite you to be a part of our academic journey and experience an environment that inspires growth, innovation, and excellence.', type: 'textarea' },

  // Signature
  { page: 'principalDesk', key: 'principalName', value: 'Mr. A. V. Gaikwad', type: 'text' },
  { page: 'principalDesk', key: 'principalQualification', value: 'ME (Mechanical)', type: 'text' },
  { page: 'principalDesk', key: 'principalTitle', value: 'Principal', type: 'text' },
  { page: 'principalDesk', key: 'principalInstitution', value: 'Satara Polytechnic Satara', type: 'text' },
]
