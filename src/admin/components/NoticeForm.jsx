import { useRef, useState } from 'react'
import { api } from '../../api'

/**
 * NoticeForm — add/edit form for notices.
 * Replaces manual URL input with a file selection for PDF or Images.
 */
export default function NoticeForm({ initial, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(() => {
    const today = new Date().toISOString().slice(0, 10)
    return {
      title: initial?.title || '',
      fileUrl: initial?.fileUrl || '',
      uploadedAt: initial?.uploadedAt ? String(initial.uploadedAt).slice(0, 10) : today,
    }
  })

  const [uploading, setUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState('')
  const [fileName, setFileName] = useState('')
  const fileRef = useRef(null)

  const set = (name, val) => setValues((cur) => ({ ...cur, [name]: val }))

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadErr('')
    setFileName(file.name)
    try {
      const { url } = await api.upload(file)
      set('fileUrl', url)
    } catch (err) {
      setUploadErr(err.message || 'File upload failed')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  function submit(e) {
    e.preventDefault()
    if (!values.fileUrl) {
      setUploadErr('Please select a PDF or image file.')
      return
    }
    const payload = {
      title: values.title.trim(),
      fileUrl: values.fileUrl,
      uploadedAt: values.uploadedAt ? new Date(values.uploadedAt).toISOString() : new Date().toISOString(),
    }
    onSubmit(payload)
  }

  const isImage = values.fileUrl && /\.(jpg|jpeg|png|webp|gif|svg)($|\?)/i.test(values.fileUrl)

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* ── Title ── */}
      <div className="admin-form-group">
        <label className="admin-label">Notice Title *</label>
        <input
          type="text"
          required
          value={values.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="e.g. Examination Timetable 2026"
          className="admin-input"
        />
      </div>

      {/* ── Select PDF / Image ── */}
      <div className="admin-form-group">
        <label className="admin-label">Select Document / Image (PDF or Image) *</label>

        {values.fileUrl ? (
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
              {isImage ? (
                <img src={values.fileUrl} alt="preview" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6 }} />
              ) : (
                <div style={{
                  width: 44, height: 44, borderRadius: 6, background: '#fee2e2', color: '#dc2626',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13
                }}>
                  PDF
                </div>
              )}
              <div style={{ overflow: 'hidden' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {fileName || (isImage ? 'Uploaded Image' : 'Uploaded PDF Document')}
                </p>
                <a href={values.fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#2563eb', textDecoration: 'none' }}>
                  View file ↗
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="admin-btn admin-btn-secondary admin-btn-sm"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => { set('fileUrl', ''); setFileName('') }}
                className="admin-btn admin-btn-danger admin-btn-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              border: '2px dashed #cbd5e1',
              borderRadius: 8,
              padding: '24px 16px',
              textAlign: 'center',
              cursor: uploading ? 'not-allowed' : 'pointer',
              background: '#f8fafc',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#94a3b8'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
          >
            <p style={{ fontSize: 14, fontWeight: 600, color: '#334155', margin: 0 }}>
              {uploading ? 'Uploading file…' : 'Click to select PDF or Image file'}
            </p>
            <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 0' }}>
              Supports PDF, PNG, JPG, WEBP (Max 10MB)
            </p>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,image/*"
          style={{ display: 'none' }}
          onChange={onFile}
        />
        {uploadErr && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 6 }}>{uploadErr}</p>}
      </div>

      {/* ── Date ── */}
      <div className="admin-form-group">
        <label className="admin-label">Date *</label>
        <input
          type="date"
          required
          value={values.uploadedAt}
          onChange={(e) => set('uploadedAt', e.target.value)}
          className="admin-input"
        />
      </div>

      {/* ── Buttons ── */}
      <div className="admin-form-footer">
        <button type="button" onClick={onCancel} className="admin-btn admin-btn-secondary admin-btn-sm">
          Cancel
        </button>
        <button type="submit" disabled={submitting || uploading} className="admin-btn admin-btn-primary admin-btn-sm">
          {submitting ? 'Saving…' : initial ? 'Save changes' : 'Add Notice'}
        </button>
      </div>
    </form>
  )
}
