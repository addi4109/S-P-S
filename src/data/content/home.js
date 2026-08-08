/**
 * homeContent — editable content blocks for the Home page.
 * Every visible string/image on src/components/home/AboutSection.jsx and
 * LocationSection.jsx lives here as a block ({ page, key, value, type }); the
 * components read them via usePageContent('home').
 */
export const homeContent = [
  // About section
  { page: 'home', key: 'aboutImage', value: '/assets/images/college.png', type: 'image' },
  { page: 'home', key: 'aboutImageAlt', value: 'College', type: 'text' },
  { page: 'home', key: 'aboutHeading', value: 'The Cradle of Achievers', type: 'text' },
  { page: 'home', key: 'aboutIntro', value: 'In the early 1980s, establishing non-grant technical education in semi-urban regions like Satara was a formidable challenge. Access to quality professional education was limited, and the philosophy of self-financed institutions was still in its infancy. During this crucial period, with the blessings and guidance of Hon. Shri K. S. Patil (Ex. MLA), the foundation of our institute was laid in 1983 under the aegis of Satara Education Society.', type: 'textarea' },
  { page: 'home', key: 'aboutReadMore', value: 'Read More →', type: 'text' },

  // Location section
  { page: 'home', key: 'locationHeading', value: 'Satara Polytechnic Satara', type: 'text' },
  { page: 'home', key: 'locationSociety', value: 'Satara Education Society\'s', type: 'text' },
  { page: 'home', key: 'locationIntro', value: 'With a legacy of over 40 years, SPS, Satara is one of the best Diploma engineering colleges in Satara, with a meritorious track record in academics, placements, and holistic growth, making it a veritable Cradle of Achievers.', type: 'textarea' },
  { page: 'home', key: 'locationLabel', value: 'Location', type: 'text' },
  { page: 'home', key: 'locationAddress', value: 'near NH - 4, near Khindwadi, Songaon, Maharashtra 415519', type: 'text' },
  { page: 'home', key: 'locationHoursLabel', value: 'Office Hours', type: 'text' },
  { page: 'home', key: 'locationHours', value: '11 AM – 5 PM', type: 'text' },
  { page: 'home', key: 'mapEmbed', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.9407362147504!2d74.00682377441001!3d17.65296569510159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2399e87a8a1e3%3A0xaae19259100b0879!2sSatara%20Polytechnic%20satara%20songaon%20tarf%20Satara!5e0!3m2!1sen!2sin!4v1767094296214!5m2!1sen!2sin', type: 'image' },
  { page: 'home', key: 'mapTitle', value: 'Satara Polytechnic Satara location', type: 'text' },
]
