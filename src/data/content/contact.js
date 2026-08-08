/**
 * contactContent — editable content blocks for the Contact page.
 * Every visible string on src/pages/Contact.jsx lives here as a block
 * ({ page, key, value, type }); the page reads them via usePageContent('contact').
 */
export const contactContent = [
  // Page header
  { page: 'contact', key: 'heading', value: 'Get in Touch', type: 'text' },
  { page: 'contact', key: 'subtitle', value: 'We value your inquiry. Kindly fill the form below.', type: 'text' },

  // Contact form
  { page: 'contact', key: 'formName', value: 'Full Name', type: 'text' },
  { page: 'contact', key: 'formEmail', value: 'Email Address', type: 'text' },
  { page: 'contact', key: 'formSubject', value: 'Subject', type: 'text' },
  { page: 'contact', key: 'formMessage', value: 'Your Message', type: 'text' },
  { page: 'contact', key: 'formSubmit', value: 'Send Message', type: 'text' },

  // Contact info card — Address
  { page: 'contact', key: 'addressTitle', value: 'Address', type: 'text' },
  { page: 'contact', key: 'addressValue', value: 'near NH - 4, near Khindwadi, Songaon, Maharashtra 415519', type: 'text' },

  // Contact info card — Email
  { page: 'contact', key: 'emailTitle', value: 'Email', type: 'text' },
  { page: 'contact', key: 'emailValue', value: 'spscomputer2026@gmail.com', type: 'text' },

  // Contact info card — Phone
  { page: 'contact', key: 'phoneTitle', value: 'Phone', type: 'text' },
  { page: 'contact', key: 'phone1', value: '+91 9881726261', type: 'text' },
  { page: 'contact', key: 'phone2', value: '+91 94233 42843', type: 'text' },

  // Contact info card — Office Hours
  { page: 'contact', key: 'hoursTitle', value: 'Office Hours', type: 'text' },
  { page: 'contact', key: 'hoursWeekdays', value: 'Monday to Friday', type: 'text' },
  { page: 'contact', key: 'hoursTime', value: '10 AM – 5 PM', type: 'text' },
]
