import { useState } from 'react'

/**
 * VirtualView — a live preview of the public website. Since the public site is
 * data-driven, admin edits appear here after refreshing the iframe.
 */
export default function VirtualView() {
  const publicUrl =
    (typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env.VITE_PUBLIC_URL) ||
    'http://localhost:5173'

  const [key, setKey] = useState(0)

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Virtual View</h2>
          <p className="admin-page-subtitle">
            Live preview of the public website. Edits made in the admin appear here after refresh.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" style={{width:14,height:14}}>
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
            </svg>
            Open in new tab
          </a>
          <button
            onClick={() => setKey((k) => k + 1)}
            className="admin-btn admin-btn-primary"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" style={{width:14,height:14}}>
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div className="admin-virtual-wrap">
        <iframe
          key={key}
          src={publicUrl}
          title="Virtual View"
        />
      </div>
    </div>
  )
}
