import { useRef, useState } from 'react'
import { api } from '../../api'

/** Whether a field type is short enough for a 2-column layout. */
function isShortField(type) {
  return ['text', 'number', 'boolean', 'select', 'date'].includes(type)
}

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:34,height:34}}>
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="M21 15l-5-5L5 21"/>
  </svg>
)

/**
 * ResourceForm — add/edit form designed to fit in a single viewport.
 * A compact image banner across the top (when the resource has an image field),
 * short fields in a 2-column grid, textareas full width, buttons at the bottom.
 */
export default function ResourceForm({ config, initial, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(() => {
    const v = {}
    for (const f of config.fields) {
      v[f.name] =
        initial && initial[f.name] !== undefined
          ? initial[f.name]
          : f.type === 'boolean'
            ? false
            : ''
    }
    return v
  })

  const [uploading, setUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState('')
  const fileRef = useRef(null)

  const set = (name, val) => setValues((cur) => ({ ...cur, [name]: val }))

  const imageField = config.imageField
  const imageValue = imageField ? values[imageField] : ''
  const bodyFields = config.fields.filter((f) => f.name !== imageField)

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadErr('')
    try {
      const { url } = await api.upload(file)
      set(imageField, url)
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
    for (const f of config.fields) {
      if (f.type === 'number') payload[f.name] = payload[f.name] === '' ? undefined : Number(payload[f.name])
      if (f.type === 'boolean') payload[f.name] = Boolean(payload[f.name])
      if (payload[f.name] === '') payload[f.name] = undefined
    }
    onSubmit(payload)
  }

  /** Render a single field element. */
  function renderInput(f) {
    if (f.type === 'textarea') {
      return (
        <textarea
          rows={3}
          value={values[f.name] || ''}
          onChange={(e) => set(f.name, e.target.value)}
          className="admin-textarea"
        />
      )
    }
    if (f.type === 'number') {
      return (
        <input
          type="number"
          value={values[f.name]}
          onChange={(e) => set(f.name, e.target.value)}
          className="admin-input"
        />
      )
    }
    if (f.type === 'boolean') {
      return (
        <div className="admin-toggle-wrap">
          <label className="admin-toggle">
            <input
              type="checkbox"
              checked={Boolean(values[f.name])}
              onChange={(e) => set(f.name, e.target.checked)}
            />
            <span className="admin-toggle-slider" />
          </label>
          <span className="admin-toggle-label">
            {Boolean(values[f.name]) ? 'Yes' : 'No'}
          </span>
        </div>
      )
    }
    if (f.type === 'select') {
      return (
        <select
          value={values[f.name] || ''}
          onChange={(e) => set(f.name, e.target.value)}
          className="admin-select"
        >
          <option value="">— select —</option>
          {(f.options || []).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )
    }
    if (f.type === 'date') {
      return (
        <input
          type="date"
          value={values[f.name] ? String(values[f.name]).slice(0, 10) : ''}
          onChange={(e) => set(f.name, e.target.value)}
          className="admin-input"
        />
      )
    }
    return (
      <input
        type="text"
        required={f.required}
        value={values[f.name] || ''}
        onChange={(e) => set(f.name, e.target.value)}
        className="admin-input"
      />
    )
  }

  const short = bodyFields.filter((f) => isShortField(f.type))
  const long = bodyFields.filter((f) => !isShortField(f.type))

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ── Image banner ── */}
      {imageField && (
        <div className="admin-image-banner">
          {imageValue ? (
            <img src={imageValue} alt="" className="admin-image-banner-img" />
          ) : (
            <div className="admin-image-banner-placeholder">
              <ImageIcon />
              No image selected
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
            {imageValue && (
              <button
                type="button"
                onClick={() => set(imageField, '')}
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
      )}

      {/* ── Fields ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {short.length > 0 && (
          <div className="admin-fields-grid">
            {short.map((f) => (
              <div key={f.name} className="admin-form-group">
                <label className="admin-label">{f.label}</label>
                {renderInput(f)}
              </div>
            ))}
          </div>
        )}
        {long.map((f) => (
          <div key={f.name} className="admin-form-group">
            <label className="admin-label">{f.label}</label>
            {renderInput(f)}
          </div>
        ))}
        {imageField && (
          <div className="admin-url-paste">
            <span className="admin-url-paste-label">Or paste an image URL directly:</span>
            <input
              type="text"
              value={imageValue || ''}
              onChange={(e) => set(imageField, e.target.value)}
              placeholder="https://…"
              className="admin-input"
            />
          </div>
        )}
      </div>

      {/* ── Buttons ── */}
      <div className="admin-form-footer">
        <button type="button" onClick={onCancel} className="admin-btn admin-btn-secondary admin-btn-sm">
          Cancel
        </button>
        <button type="submit" disabled={submitting} className="admin-btn admin-btn-primary admin-btn-sm">
          {submitting ? 'Saving…' : initial ? 'Save changes' : 'Add'}
        </button>
      </div>
    </form>
  )
}
