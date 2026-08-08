import { useRef, useState } from 'react'
import { api } from '../../api'

const ImagePlaceholderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:36,height:36}}>
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="M21 15l-5-5L5 21"/>
  </svg>
)

/**
 * DepartmentForm — add/edit form styled to match the frontend DeptCard:
 * large image banner, card title input, description textarea, intake + direct
 * 2nd Year meta row, and admin-only settings below a divider.
 */
export default function DepartmentForm({ initial, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(() => {
    const base = {
      slug: '',
      code: '',
      cardTitle: '',
      pageTitle: '',
      navLabel: '',
      subtitle: '',
      description: '',
      vision: '',
      mission: '',
      peos: '',
      psos: '',
      image: '',
      intake: '',
      direct2ndYear: false,
      ring: 'border-indigo-100',
      accent: 'text-indigo-600',
      emailColor: 'text-blue-600',
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
    if (payload.intake !== '') payload.intake = Number(payload.intake)
    else payload.intake = undefined
    for (const k of Object.keys(payload)) {
      if (payload[k] === '') payload[k] = undefined
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ── Image banner ── */}
      <div className="admin-image-banner">
        {values.image ? (
          <img src={values.image} alt="" className="admin-image-banner-img" />
        ) : (
          <div className="admin-image-banner-placeholder">
            <ImagePlaceholderIcon />
            No image — upload or paste URL below
          </div>
        )}
        <div className="admin-image-banner-actions">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="admin-image-banner-btn admin-image-banner-btn-change"
          >
            {uploading ? 'Uploading…' : 'Upload Image'}
          </button>
          {values.image && (
            <button
              type="button"
              onClick={() => set('image', '')}
              className="admin-image-banner-btn admin-image-banner-btn-remove"
            >
              Remove
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />
        {uploadErr && (
          <p style={{ fontSize: 12, color: '#ef4444', padding: '6px 22px 0' }}>{uploadErr}</p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Card Title */}
        <div className="admin-form-group">
          <label className="admin-label">Department Name (Card Title) *</label>
          <input
            value={values.cardTitle}
            onChange={(e) => set('cardTitle', e.target.value)}
            placeholder="e.g. Computer Engineering"
            required
            className="admin-input"
            style={{ fontSize: 15, fontWeight: 600 }}
          />
        </div>

        {/* Description */}
        <div className="admin-form-group">
          <label className="admin-label">Description</label>
          <textarea
            rows={3}
            value={values.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Short description for the card"
            className="admin-textarea"
          />
        </div>

        {/* Vision & Mission */}
        <div className="admin-form-group">
          <label className="admin-label">Department Vision</label>
          <textarea
            rows={2}
            value={values.vision}
            onChange={(e) => set('vision', e.target.value)}
            placeholder="Department Vision Statement…"
            className="admin-textarea"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Department Mission</label>
          <textarea
            rows={3}
            value={values.mission}
            onChange={(e) => set('mission', e.target.value)}
            placeholder="Department Mission Statement (points 1, 2, 3)…"
            className="admin-textarea"
          />
        </div>

        {/* Intake + Direct 2nd Year */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label className="admin-label" style={{ marginBottom: 0 }}>Intake</label>
            <input
              type="number"
              value={values.intake}
              onChange={(e) => set('intake', e.target.value)}
              className="admin-input"
              style={{ width: 90 }}
            />
          </div>
          <div className="admin-toggle-wrap">
            <label className="admin-toggle">
              <input
                type="checkbox"
                checked={Boolean(values.direct2ndYear)}
                onChange={(e) => set('direct2ndYear', e.target.checked)}
              />
              <span className="admin-toggle-slider" />
            </label>
            <span className="admin-toggle-label">Direct 2nd Year</span>
          </div>
        </div>

        {/* Admin fields */}
        <hr className="admin-divider" />
        <p className="admin-label" style={{ marginBottom: 0, color: '#9ca3af' }}>Advanced / Admin Fields</p>

        <div className="admin-fields-grid">
          <div className="admin-form-group">
            <label className="admin-label">Slug *</label>
            <input
              value={values.slug}
              onChange={(e) => set('slug', e.target.value)}
              required
              placeholder="computer-engineering"
              className="admin-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Code</label>
            <input
              value={values.code}
              onChange={(e) => set('code', e.target.value)}
              placeholder="CO"
              className="admin-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Page Title</label>
            <input
              value={values.pageTitle}
              onChange={(e) => set('pageTitle', e.target.value)}
              className="admin-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Nav Label</label>
            <input
              value={values.navLabel}
              onChange={(e) => set('navLabel', e.target.value)}
              className="admin-input"
            />
          </div>
          <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="admin-label">Subtitle</label>
            <input
              value={values.subtitle}
              onChange={(e) => set('subtitle', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        {/* Image URL paste */}
        <div className="admin-url-paste">
          <span className="admin-url-paste-label">Or paste an image URL directly:</span>
          <input
            type="text"
            value={values.image || ''}
            onChange={(e) => set('image', e.target.value)}
            placeholder="https://…"
            className="admin-input"
          />
        </div>
      </div>

      {/* ── Buttons ── */}
      <div className="admin-form-footer">
        <button type="button" onClick={onCancel} className="admin-btn admin-btn-secondary">Cancel</button>
        <button type="submit" disabled={submitting} className="admin-btn admin-btn-primary">
          {submitting ? 'Saving…' : initial ? 'Save changes' : 'Add'}
        </button>
      </div>
    </form>
  )
}
