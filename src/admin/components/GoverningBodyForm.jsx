import { useRef, useState } from 'react'
import { api } from '../../api'

/**
 * GoverningBodyForm — add/edit form styled to match the frontend governing
 * body member card: centered circular photo, name, designation, section picker.
 */
export default function GoverningBodyForm({ initial, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(() => {
    const base = {
      section: 'Governing Body',
      name: '',
      designation: '',
      alt: '',
      photo: '',
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

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadErr('')
    try {
      const { url } = await api.upload(file)
      set('photo', url)
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
          {values.photo ? (
            <img
              src={values.photo}
              alt={values.alt || values.name || ''}
              className="admin-photo-circle"
              style={{ width: 110, height: 110, borderColor: '#c7d2fe' }}
            />
          ) : (
            <div className="admin-photo-circle-placeholder" style={{ width: 110, height: 110 }}>
              No photo
            </div>
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

      {/* ── Designation ── */}
      <input
        value={values.designation}
        onChange={(e) => set('designation', e.target.value)}
        placeholder="e.g. Chairman, Member"
        className="admin-form-role-input"
        style={{ color: '#2563eb' }}
      />

      {/* ── Section ── */}
      <div className="admin-form-dept-wrap">
        <span className="admin-form-dept-label">Section</span>
        <select
          value={values.section}
          onChange={(e) => set('section', e.target.value)}
          className="admin-select"
        >
          <option value="Governing Body">Governing Body</option>
          <option value="Local Government Body">Local Government Body</option>
        </select>
      </div>

      {/* ── Alt text ── */}
      <div className="admin-form-dept-wrap">
        <label className="admin-form-dept-label">Alt text (accessibility)</label>
        <input
          value={values.alt}
          onChange={(e) => set('alt', e.target.value)}
          placeholder="e.g. Hon. Dr. Chetna Majgaonkar, Chairman"
          className="admin-input"
        />
      </div>

      {/* ── Photo URL ── */}
      <div className="admin-url-paste" style={{ width: '100%', maxWidth: 320 }}>
        <span className="admin-url-paste-label">Or paste a photo URL:</span>
        <input
          type="text"
          value={values.photo || ''}
          onChange={(e) => set('photo', e.target.value)}
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
