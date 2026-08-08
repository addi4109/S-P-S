import { useRef, useState } from 'react'
import { api } from '../../api'

/**
 * ImageUploader — uploads an image to Cloudinary (POST /api/upload) and
 * reports the resulting URL via onChange. Also allows pasting a URL directly.
 */
export default function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState('')
  const inputRef = useRef(null)

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setErr('')
    try {
      const { url } = await api.upload(file)
      onChange(url)
    } catch (e2) {
      setErr(e2.message)
    } finally {
      setUploading(false)
      inputRef.current && (inputRef.current.value = '')
    }
  }

  return (
    <div>
      {/* Preview */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
        {value ? (
          <img
            src={value}
            alt="preview"
            style={{
              width: 80, height: 80, objectFit: 'cover',
              borderRadius: 10, border: '2px solid #e5e7eb',
              flexShrink: 0,
            }}
          />
        ) : (
          <div style={{
            width: 80, height: 80, borderRadius: 10,
            border: '2px dashed #d1d5db',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: '#9ca3af', flexShrink: 0,
          }}>
            No image
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="admin-btn admin-btn-secondary admin-btn-sm"
          >
            {uploading ? 'Uploading…' : '↑ Upload image'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="admin-btn admin-btn-danger admin-btn-sm"
            >
              ✕ Remove
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onFile}
          />
        </div>
      </div>

      {/* URL paste */}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste an image URL"
        className="admin-input"
      />
      {err && <p className="admin-upload-error" style={{ textAlign: 'left', marginTop: 4 }}>{err}</p>}
    </div>
  )
}
