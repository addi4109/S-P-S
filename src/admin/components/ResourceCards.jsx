import { useState } from 'react'
import { isUrlLike } from '../../config/resources'

function NoImageIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  )
}

function PdfDocumentIcon() {
  return (
    <svg width="32" height="32" fill="none" stroke="#dc2626" strokeWidth="1.75" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  )
}

/**
 * ResourceCard — clean, professional card representation for resources.
 * Renders PDF Document banners for PDF files & falls back to PDF banner on image error.
 */
function ResourceCard({ config, row, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false)
  const fileUrl = row.fileUrl || (config.imageField && row[config.imageField]) || row.image || row.photo || ''

  let title = row[config.listField]
  let titleIsUrl = isUrlLike(title)
  if (titleIsUrl) title = config.singular

  let subtitle = config.subtitleField ? row[config.subtitleField] : ''
  if (!subtitle) {
    for (const f of config.fields) {
      if (f.type === 'image' || f.name === config.listField || f.name === config.imageField) continue
      const v = row[f.name]
      if (v && !isUrlLike(v)) {
        subtitle = v
        break
      }
    }
  }

  const order = config.fields.some((f) => f.name === 'order') ? row.order : null
  const isRecruiter = config.singular === 'Recruiter' || config.label === 'Recruiters'

  // PDF check
  const isPdf = Boolean(
    imgError ||
    (fileUrl && (
      fileUrl.toLowerCase().includes('.pdf') ||
      fileUrl.toLowerCase().includes('application/pdf') ||
      config.singular === 'Notice'
    ))
  )

  return (
    <div className="admin-resource-card">
      {/* Top Banner (PDF or Image or Fallback) */}
      {isPdf ? (
        <div
          className="admin-card-image-wrap"
          style={{
            background: '#fef2f2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            borderBottom: '1px solid #fecaca',
          }}
        >
          <PdfDocumentIcon />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', letterSpacing: '0.04em' }}>
            PDF DOCUMENT
          </span>
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-pdf-link"
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#2563eb',
                background: '#ffffff',
                padding: '3px 10px',
                borderRadius: 12,
                border: '1px solid #cbd5e1',
                textDecoration: 'none',
                marginTop: 2,
              }}
            >
              View PDF ↗
            </a>
          )}
        </div>
      ) : (
        <div
          className="admin-card-image-wrap"
          style={{
            background: isRecruiter ? '#ffffff' : '#f1f5f9',
            padding: isRecruiter ? 14 : 0,
          }}
        >
          {fileUrl ? (
            <img
              src={fileUrl}
              alt=""
              loading="lazy"
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: isRecruiter ? 'contain' : 'cover',
              }}
            />
          ) : (
            <div className="admin-card-no-image">
              <NoImageIcon />
              No file attached
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="admin-card-body">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
          <h4 className="admin-card-title">{title}</h4>
          {order !== null && order !== undefined && (
            <span className="admin-badge admin-badge-order">#{order}</span>
          )}
        </div>
        {subtitle && (
          <p className="admin-card-subtitle">{String(subtitle)}</p>
        )}

        {/* Action buttons */}
        <div className="admin-card-actions" style={{ marginTop: 'auto' }}>
          <button onClick={() => onEdit(row)} className="admin-card-btn-edit">Edit</button>
          <button onClick={() => onDelete(row)} className="admin-card-btn-delete">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default function ResourceCards({ config, rows, onEdit, onDelete, renderItem }) {
  if (!rows.length) {
    return (
      <div className="admin-empty">
        <div className="admin-empty-icon">📁</div>
        <h3>No {config.label.toLowerCase()} yet</h3>
        <p>Click "+ Add {config.singular}" above to create your first record.</p>
      </div>
    )
  }

  return (
    <div className="admin-cards-grid">
      {rows.map((row) => {
        if (typeof renderItem === 'function') {
          return renderItem(row)
        }
        return (
          <ResourceCard
            key={row._id || row.id || row.slug || row.name || row.title}
            config={config}
            row={row}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )
      })}
    </div>
  )
}
