import { departments as staticDepartments } from '../data/departments.js'

export function isUrlLike(str) {
  if (typeof str !== 'string') return false
  return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:') || str.startsWith('/')
}

/**
 * resources — the single source of truth for the admin panel's CRUD screens.
 * Each entry describes one editable collection: how the list rows are labelled
 * and which form fields to render (mirrors server/resources.js field allowlists).
 */
export const RESOURCES = {
  departments: {
    label: 'Departments',
    singular: 'Department',
    listField: 'cardTitle',
    imageField: 'image',
    subtitleField: 'description',
    fields: [
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'code', label: 'Code', type: 'text' },
      { name: 'cardTitle', label: 'Card Title', type: 'text', required: true },
      { name: 'pageTitle', label: 'Page Title', type: 'text' },
      { name: 'navLabel', label: 'Nav Label', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'vision', label: 'Vision', type: 'textarea' },
      { name: 'mission', label: 'Mission', type: 'textarea' },
      { name: 'peos', label: 'Program Educational Objectives (PEOs)', type: 'textarea' },
      { name: 'psos', label: 'Program Specific Outcomes (PSOs)', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'intake', label: 'Intake', type: 'number' },
      { name: 'direct2ndYear', label: 'Direct 2nd Year', type: 'boolean' },
    ],
  },
  staff: {
    label: 'Staff',
    singular: 'Staff Member',
    listField: 'name',
    imageField: 'image',
    subtitleField: 'role',
    // Group the list by department (options come from the `department` field).
    groupBy: { field: 'department', label: 'Department' },
    fields: [
      {
        name: 'department',
        label: 'Department',
        type: 'select',
        options: staticDepartments.map((d) => ({ value: d.slug, label: d.cardTitle })),
      },
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'qualification', label: 'Qualification', type: 'text' },
      { name: 'experience', label: 'Experience', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'image', label: 'Photo', type: 'image' },
    ],
  },
  gallery: {
    label: 'Gallery',
    singular: 'Photo',
    listField: 'caption',
    imageField: 'src',
    subtitleField: 'caption',
    fields: [
      { name: 'src', label: 'Image URL', type: 'image' },
      { name: 'caption', label: 'Caption', type: 'textarea' },
      { name: 'year', label: 'Year', type: 'select', options: ['2022', '2025', '2026'].map((y) => ({ value: y, label: y })) },
    ],
  },
  governingBody: {
    label: 'Governing Body',
    singular: 'Member',
    listField: 'name',
    imageField: 'photo',
    subtitleField: 'designation',
    fields: [
      {
        name: 'section',
        label: 'Section',
        type: 'select',
        options: [
          { value: 'Governing Body', label: 'Governing Body' },
          { value: 'Local Government Body', label: 'Local Government Body' },
        ],
      },
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'designation', label: 'Designation', type: 'text' },
      { name: 'alt', label: 'Alt text', type: 'text' },
      { name: 'photo', label: 'Photo', type: 'image' },
    ],
  },
  notices: {
    label: 'Notices',
    singular: 'Notice',
    listField: 'title',
    imageField: 'fileUrl',
    subtitleField: 'uploadedAt',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'fileUrl', label: 'PDF / File URL', type: 'text' },
      { name: 'uploadedAt', label: 'Date', type: 'date' },
    ],
  },
  recruiters: {
    label: 'Recruiters',
    singular: 'Recruiter',
    listField: 'name',
    imageField: 'image',
    subtitleField: 'name',
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'image', label: 'Logo', type: 'image' },
      { name: 'order', label: 'Order', type: 'number' },
    ],
  },
  hero: {
    label: 'Hero Slides',
    singular: 'Slide',
    listField: 'image',
    imageField: 'image',
    subtitleField: 'order',
    fields: [
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'order', label: 'Order', type: 'number' },
      { name: 'active', label: 'Active', type: 'boolean' },
    ],
  },
  settings: {
    label: 'Site Settings',
    singular: 'Setting',
    listField: 'key',
    subtitleField: 'value',
    fields: [
      { name: 'key', label: 'Key', type: 'text', required: true },
      { name: 'value', label: 'Value', type: 'textarea' },
    ],
  },
  content: {
    label: 'Content',
    singular: 'Content Block',
    listField: 'key',
    subtitleField: 'value',
    fields: [
      {
        name: 'page',
        label: 'Page',
        type: 'select',
        options: [
          { value: 'home', label: 'Home' },
          { value: 'about', label: 'About' },
          { value: 'contact', label: 'Contact' },
          { value: 'principalDesk', label: "Principal's Desk" },
          { value: 'placement', label: 'Placement' },
          { value: 'grievance', label: 'Grievance' },
          { value: 'admission', label: 'Admission' },
          { value: 'header', label: 'Header' },
          { value: 'footer', label: 'Footer' },
        ],
      },
      { name: 'key', label: 'Key', type: 'text', required: true },
      {
        name: 'type',
        label: 'Type',
        type: 'select',
        options: [
          { value: 'text', label: 'Text' },
          { value: 'textarea', label: 'Textarea' },
          { value: 'image', label: 'Image' },
        ],
      },
      { name: 'value', label: 'Value', type: 'textarea' },
    ],
  },
}

export function getResourceConfig(name) {
  return RESOURCES[name]
}
