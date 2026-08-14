import { useRef, useState } from 'react'
import { api } from '../../api'
import { departments as staticDepartments } from '../../data/departments'

const staticDeptLookup = Object.fromEntries(staticDepartments.map((d) => [d.slug, d]))

/**
 * StaffForm — add/edit form styled to match the frontend StaffCard:
 * circular photo centered on top, name, role (colored), qualification,
 * experience, email — all centered in a vertical column.
 */
export default function StaffForm({ initial, onSubmit, onCancel, submitting, departments }) {
  // Merge live departments with static fallback, deduplicate by slug
  const allDepts = (() => {
    const live = Array.isArray(departments) && departments.length > 0 ? departments : staticDepartments
    return live
  })()
  const deptLookup = Object.fromEntries(allDepts.map((d) => [d.slug, d]))
  const accentOptions = allDepts.map((d) => ({ value: d.slug, label: d.navLabel || d.cardTitle }))
  const [values, setValues] = useState(() => {
    const base = {
      department: '',
      name: '',
      role: '',
      qualification: '',
      experience: '',
      email: '',
      image: '',
    }
    if (initial) {
      for (const k of Object.keys(base)) {
        base[k] = initial[k] ?? base[k]
      }
    }
    return base
  })

  const [uploading, setUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState('')
  const fileRef = useRef(null)

  const set = (name, val) => setValues((cur) => ({ ...cur, [name]: val }))

  const dept = deptLookup[values.department] || allDepts[0] || {}
  const ring = dept.ring || 'border-indigo-100'
  const accent = dept.accent || 'text-indigo-600'

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadErr('')
    try {
      const { url } = await api.upload(file)
      set('image', url)
    } catch (err) {
      setUploadErr(err.message)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  function submit(e) {
    e.preventDefault()
    const payload = { ...values }
    for (const k of Object.keys(payload)) {
      if (payload[k] === '') payload[k] = undefined
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={submit} className="admin-centered-form">
      {/* ── Circular photo ── */}
      <div className="admin-photo-circle-wrap">
        <div className="admin-photo-circle-pos">
          {values.image ? (
            <img
              src={values.image}
              alt={values.name || ''}
              className="admin-photo-circle"
            />
          ) : (
            <div className="admin-photo-circle-placeholder">No photo</div>
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="admin-photo-change-btn"
            aria-label="Change photo"
            style={{ width: 'auto', padding: '4px 10px', borderRadius: 12, fontSize: 11 }}
          >
            {uploading ? 'Uploading…' : 'Upload Photo'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />
        </div>
        {uploadErr && <p className="admin-upload-error">{uploadErr}</p>}
      </div>

      {/* ── Name ── */}
      <input
        value={values.name}
        onChange={(e) => set('name', e.target.value)}
        placeholder="Full name"
        required
        className="admin-form-name-input"
      />

      {/* ── Role ── */}
      <input
        value={values.role}
        onChange={(e) => set('role', e.target.value)}
        placeholder="Role (e.g. Incharge HOD)"
        className="admin-form-role-input"
        style={{ color: accent.replace('text-', '').replace('-600', '') !== 'indigo' ? '' : '#4f46e5' }}
      />

      {/* ── Details block ── */}
      <div className="admin-form-details-block">
        <div className="admin-form-detail-row">
          <span className="admin-form-detail-label">Qualification</span>
          <input
            value={values.qualification}
            onChange={(e) => set('qualification', e.target.value)}
            placeholder="e.g. M.Tech"
            className="admin-form-detail-input"
          />
        </div>
        <div className="admin-form-detail-row">
          <span className="admin-form-detail-label">Experience</span>
          <input
            value={values.experience}
            onChange={(e) => set('experience', e.target.value)}
            placeholder="e.g. 5 Years"
            className="admin-form-detail-input"
          />
        </div>
        <div className="admin-form-detail-row">
          <span className="admin-form-detail-label">Email</span>
          <input
            type="email"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="email@example.com"
            className="admin-form-detail-input"
          />
        </div>
      </div>

      {/* ── Department ── */}
      <div className="admin-form-dept-wrap">
        <span className="admin-form-dept-label">Department</span>
        <select
          value={values.department}
          onChange={(e) => set('department', e.target.value)}
          className="admin-select"
        >
          <option value="">— select —</option>
          {accentOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* ── Image URL paste ── */}
      <div className="admin-url-paste" style={{ width: '100%', maxWidth: 320 }}>
        <span className="admin-url-paste-label">Or paste a photo URL:</span>
        <input
          type="text"
          value={values.image || ''}
          onChange={(e) => set('image', e.target.value)}
          placeholder="https://…"
          className="admin-input"
        />
      </div>

      {/* ── Buttons ── */}
      <div className="admin-form-footer" style={{ width: '100%', maxWidth: 320 }}>
        <button type="button" onClick={onCancel} className="admin-btn admin-btn-secondary" style={{ flex: 1 }}>
          Cancel
        </button>
        <button type="submit" disabled={submitting} className="admin-btn admin-btn-primary" style={{ flex: 1 }}>
          {submitting ? 'Saving…' : initial ? 'Save changes' : 'Add'}
        </button>
      </div>
    </form>
  )
}
