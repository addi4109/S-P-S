/**
 * placementContent — editable content blocks for the Placement page.
 * Each block is { page, key, value, type } with type 'text' | 'textarea' | 'image'.
 * The live source of truth is MongoDB (seeded from this module); the page's
 * usePageContent('placement') reads these by key.
 */
export const placementContent = [
  // Hero
  { page: 'placement', key: 'heroTitle', value: 'College Placement Cell', type: 'text' },
  {
    page: 'placement',
    key: 'heroSubtitle',
    value:
      'Cultivating professional excellence through heritage values, strategic industry alliances, and refined career guidance.',
    type: 'textarea',
  },

  // Introduction
  { page: 'placement', key: 'introHeading', value: 'Introduction', type: 'text' },
  {
    page: 'placement',
    key: 'introPara',
    value:
      'The Placement Cell stands as a distinguished pillar of the institution, committed to shaping careers with discretion, discipline, and long-term vision. Through enduring industry relationships and structured professional preparation, students are guided toward meaningful and respectable careers under the stewardship of the Principal and Management.',
    type: 'textarea',
  },

  // Functions of the Placement Cell (each item its own block)
  { page: 'placement', key: 'functionsHeading', value: 'Functions of the Placement Cell', type: 'text' },
  { page: 'placement', key: 'function1', value: 'Curate and conduct institutional campus recruitment initiatives.', type: 'textarea' },
  { page: 'placement', key: 'function2', value: 'Foster long-term associations with reputed industries.', type: 'textarea' },
  { page: 'placement', key: 'function3', value: 'Offer refined career counseling and professional mentorship.', type: 'textarea' },
  { page: 'placement', key: 'function4', value: 'Deliver aptitude, etiquette, and interview mastery programs.', type: 'textarea' },
  { page: 'placement', key: 'function5', value: 'Preserve detailed placement archives and corporate feedback.', type: 'textarea' },
  { page: 'placement', key: 'function6', value: 'Encourage internships and structured industrial exposure.', type: 'textarea' },
  { page: 'placement', key: 'function7', value: 'Guide students in résumé refinement and career positioning.', type: 'textarea' },

  // Composition of the Placement Cell
  { page: 'placement', key: 'compositionHeading', value: 'Composition of the Placement Cell', type: 'text' },

  // Table column headers
  { page: 'placement', key: 'compCol1', value: 'Sr. No.', type: 'text' },
  { page: 'placement', key: 'compCol2', value: 'Name', type: 'text' },
  { page: 'placement', key: 'compCol3', value: 'Designation', type: 'text' },
  { page: 'placement', key: 'compCol4', value: 'Position', type: 'text' },

  // Mobile card field labels (repeat the same values as the table cells)
  { page: 'placement', key: 'mobileCol1', value: 'Sr. No:', type: 'text' },
  { page: 'placement', key: 'mobileCol2', value: 'Name:', type: 'text' },
  { page: 'placement', key: 'mobileCol3', value: 'Designation:', type: 'text' },
  { page: 'placement', key: 'mobileCol4', value: 'Position:', type: 'text' },

  // Table row 1
  { page: 'placement', key: 'compRow1Col1', value: '1', type: 'text' },
  { page: 'placement', key: 'compRow1Col2', value: 'Mr. V.A. Bhosale', type: 'text' },
  { page: 'placement', key: 'compRow1Col3', value: 'Lecturer', type: 'text' },
  { page: 'placement', key: 'compRow1Col4', value: 'Placement Officer', type: 'text' },

  // Table row 2
  { page: 'placement', key: 'compRow2Col1', value: '2', type: 'text' },
  { page: 'placement', key: 'compRow2Col2', value: 'Mr. U.S. Patil', type: 'text' },
  { page: 'placement', key: 'compRow2Col3', value: 'HOD–CH', type: 'text' },
  { page: 'placement', key: 'compRow2Col4', value: 'Advisor', type: 'text' },

  // Table row 3
  { page: 'placement', key: 'compRow3Col1', value: '3', type: 'text' },
  { page: 'placement', key: 'compRow3Col2', value: 'Ms. K.S. Sable', type: 'text' },
  { page: 'placement', key: 'compRow3Col3', value: 'HOD – CO', type: 'text' },
  { page: 'placement', key: 'compRow3Col4', value: 'Member', type: 'text' },

  // Table row 4
  { page: 'placement', key: 'compRow4Col1', value: '4', type: 'text' },
  { page: 'placement', key: 'compRow4Col2', value: 'Mrs. A.T. Salunkhe', type: 'text' },
  { page: 'placement', key: 'compRow4Col3', value: 'HOD – ENTC', type: 'text' },
  { page: 'placement', key: 'compRow4Col4', value: 'Member', type: 'text' },

  // Student Placement Support
  { page: 'placement', key: 'supportHeading', value: 'Student Placement Support', type: 'text' },
  {
    page: 'placement',
    key: 'supportPara1',
    value:
      'Every student of Satara Polytechnic, Satara is entitled to discreet, professional placement guidance through the Placement Cell. Active participation in training programs and placement initiatives is strongly encouraged.',
    type: 'textarea',
  },
  {
    page: 'placement',
    key: 'supportPara2',
    value:
      'Students may approach the Placement Officer via the college office for career consultations and placement-related matters.',
    type: 'textarea',
  },
]
