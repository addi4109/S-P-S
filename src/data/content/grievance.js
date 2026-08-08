/**
 * Editable content blocks for the Grievance page.
 * Shape: { page, key, value, type } where type is 'text' (short single-line),
 * 'textarea' (paragraphs/multi-line), or 'image' (URLs).
 */
export const grievanceContent = [
  // Hero
  { page: 'grievance', key: 'heroTitle', value: 'College Grievance Redressal Cell', type: 'text' },
  { page: 'grievance', key: 'heroSubtitle', value: 'Ensuring a secure and harmonious environment for all Staff and Students.', type: 'text' },

  // Introduction
  { page: 'grievance', key: 'introHeading', value: 'Introduction', type: 'text' },
  { page: 'grievance', key: 'introText1', value: 'The grievances received by the Principal are forwarded to the concerned Committee members.', type: 'textarea' },
  { page: 'grievance', key: 'introText2', value: 'Staff can mail their grievances at', type: 'textarea' },
  { page: 'grievance', key: 'grievanceEmail', value: 'spscomputer2026@gmail.com', type: 'text' },

  // Functions of the Grievance Redressal Committee
  { page: 'grievance', key: 'functionsHeading', value: 'Functions of the Grievance Redressal Committee', type: 'text' },
  { page: 'grievance', key: 'function1', value: 'Accept written grievances from students and staff related to the system.', type: 'text' },
  { page: 'grievance', key: 'function2', value: 'Create and implement a mechanism to handle the reported grievances.', type: 'text' },
  { page: 'grievance', key: 'function3', value: 'Forward the findings to the Management if necessary for further action.', type: 'text' },
  { page: 'grievance', key: 'function4', value: 'Listen, record and scrutinize the grievances submitted by the Staff and Students and take necessary steps immediately.', type: 'text' },
  { page: 'grievance', key: 'function5', value: 'Attend to the grievances based on authenticity and gravity of the criticisms made.', type: 'text' },
  { page: 'grievance', key: 'function6', value: 'Represent the grievances to the concerned section which may include maintenance, transport, academic, amenities etc.', type: 'text' },
  { page: 'grievance', key: 'function7', value: 'Convene periodical meetings to discuss whether the grievances have been settled.', type: 'text' },
  { page: 'grievance', key: 'function8', value: 'Follow-up of these matters at regular intervals till their final disposal.', type: 'text' },
  { page: 'grievance', key: 'function9', value: 'Maintain strict confidentiality, if necessary.', type: 'text' },

  // Composition table — heading + header row
  { page: 'grievance', key: 'tableHeading', value: 'Composition of College Grievance Redressal Cell', type: 'text' },
  { page: 'grievance', key: 'colNo', value: 'Sr. No.', type: 'text' },
  { page: 'grievance', key: 'colName', value: 'Name', type: 'text' },
  { page: 'grievance', key: 'colDesignation', value: 'Designation', type: 'text' },
  { page: 'grievance', key: 'colPosition', value: 'Position', type: 'text' },

  // Composition table — row cells (also reused by mobile cards)
  { page: 'grievance', key: 'row1No', value: '1', type: 'text' },
  { page: 'grievance', key: 'row1Name', value: 'Mr. R.S Jagtap', type: 'text' },
  { page: 'grievance', key: 'row1Designation', value: 'Committee Head', type: 'text' },
  { page: 'grievance', key: 'row1Position', value: 'Student Counseling Commitee', type: 'text' },
  { page: 'grievance', key: 'row2No', value: '2', type: 'text' },
  { page: 'grievance', key: 'row2Name', value: 'Ms. K.S Sabale', type: 'text' },
  { page: 'grievance', key: 'row2Designation', value: 'Committee Head', type: 'text' },
  { page: 'grievance', key: 'row2Position', value: 'Women Grievance Cell', type: 'text' },
  { page: 'grievance', key: 'row3No', value: '3', type: 'text' },
  { page: 'grievance', key: 'row3Name', value: 'Mr. U.S Patil', type: 'text' },
  { page: 'grievance', key: 'row3Designation', value: 'Committee Head', type: 'text' },
  { page: 'grievance', key: 'row3Position', value: 'Internal Quality Assurance', type: 'text' },
  { page: 'grievance', key: 'row4No', value: '4', type: 'text' },
  { page: 'grievance', key: 'row4Name', value: 'Mrs. A.T Salunkhe', type: 'text' },
  { page: 'grievance', key: 'row4Designation', value: 'Committee Head', type: 'text' },
  { page: 'grievance', key: 'row4Position', value: 'Health Care Commitee', type: 'text' },
  { page: 'grievance', key: 'row5No', value: '5', type: 'text' },
  { page: 'grievance', key: 'row5Name', value: 'Mr. V.A Bhosale', type: 'text' },
  { page: 'grievance', key: 'row5Designation', value: 'Committee Head', type: 'text' },
  { page: 'grievance', key: 'row5Position', value: 'Student Grievance Cell', type: 'text' },
  { page: 'grievance', key: 'row6No', value: '6', type: 'text' },
  { page: 'grievance', key: 'row6Name', value: 'Mr. A.V Gaikwad', type: 'text' },
  { page: 'grievance', key: 'row6Designation', value: 'Committee Head.', type: 'text' },
  { page: 'grievance', key: 'row6Position', value: 'Anti Ragging Commitee', type: 'text' },
  { page: 'grievance', key: 'row7No', value: '7', type: 'text' },
  { page: 'grievance', key: 'row7Name', value: 'Mrs. S.S Pawar', type: 'text' },
  { page: 'grievance', key: 'row7Designation', value: 'Committee Head', type: 'text' },
  { page: 'grievance', key: 'row7Position', value: 'Internal Complaint Commitee', type: 'text' },
  { page: 'grievance', key: 'row8No', value: '8', type: 'text' },
  { page: 'grievance', key: 'row8Name', value: 'Mrs. T.S Bagwan', type: 'text' },
  { page: 'grievance', key: 'row8Designation', value: 'Committee Head', type: 'text' },
  { page: 'grievance', key: 'row8Position', value: 'Student Mentoring Cell', type: 'text' },

  // Student Grievances
  { page: 'grievance', key: 'studentHeading', value: 'Student Grievances', type: 'text' },
  { page: 'grievance', key: 'studentText', value: 'All students enrolled at Satara Polytechnic Satara have the right to appeal any academic matter in which they feel unfairly treated.', type: 'textarea' },
]
