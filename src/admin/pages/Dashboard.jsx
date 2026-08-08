import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import { RESOURCES } from '../../config/resources'

/**
 * Dashboard — plain & clean admin landing page with simple cards and hover effect.
 */
export default function Dashboard() {
  const [status, setStatus] = useState({ mongodb: null, cloudinary: null })
  const [counts, setCounts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([
      api.getStatus(),
      api
        .getData()
        .then((d) => {
          const c = {}
          for (const name of Object.keys(RESOURCES)) {
            c[name] = Array.isArray(d[name]) ? d[name].length : 0
          }
          return c
        })
        .catch(() => null),
    ])
      .then(([s, c]) => {
        if (!active) return
        setStatus(s)
        setCounts(c)
      })
      .catch(() => {
        if (active) setStatus({ mongodb: false, cloudinary: false })
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const dbOffline = status.mongodb === false

  return (
    <div>
      {/* ── Alerts ── */}
      {dbOffline && (
        <div className="admin-alert admin-alert-warning">
          <span>
            MongoDB is offline — admin edits won't persist and the site is showing static fallback data.
          </span>
        </div>
      )}
      {status.cloudinary === false && (
        <div className="admin-alert admin-alert-warning">
          <span>
            Cloudinary isn't configured — image uploads are disabled until CLOUDINARY_CLOUD_NAME is set in .env.
          </span>
        </div>
      )}

      {/* ── Status row ── */}
      <div className="admin-status-row">
        <div className="admin-status-pill">
          <span className={`admin-status-dot ${
            status.mongodb === null ? 'admin-status-dot-loading' :
            status.mongodb ? 'admin-status-dot-online' : 'admin-status-dot-offline'
          }`} />
          <span className="admin-status-label">MongoDB:</span>
          <span className={
            status.mongodb === null ? '' :
            status.mongodb ? 'admin-status-value-online' : 'admin-status-value-offline'
          }>
            {status.mongodb === null ? 'Checking…' : status.mongodb ? 'Connected' : 'Offline'}
          </span>
        </div>

        <div className="admin-status-pill">
          <span className={`admin-status-dot ${
            status.cloudinary === null ? 'admin-status-dot-loading' :
            status.cloudinary ? 'admin-status-dot-online' : 'admin-status-dot-offline'
          }`} />
          <span className="admin-status-label">Cloudinary:</span>
          <span className={
            status.cloudinary === null ? '' :
            status.cloudinary ? 'admin-status-value-online' : 'admin-status-value-offline'
          }>
            {status.cloudinary === null ? 'Checking…' : status.cloudinary ? 'Configured' : 'Not configured'}
          </span>
        </div>
      </div>

      {/* ── Plain Stat Cards ── */}
      {loading ? (
        <div className="admin-spinner-wrap">
          <div className="admin-spinner" />
          Loading dashboard…
        </div>
      ) : (
        <div className="admin-stat-grid">
          {Object.keys(RESOURCES).map((name) => {
            const cfg = RESOURCES[name]
            return (
              <Link
                key={name}
                to={`/admin/${name}`}
                className="admin-stat-card-plain"
              >
                <div className="admin-stat-card-top">
                  <h3 className="admin-stat-plain-title">{cfg.label}</h3>
                  <span className="admin-stat-plain-count">
                    {counts && counts[name] !== undefined ? counts[name] : 0}
                  </span>
                </div>
                <div className="admin-stat-plain-footer">
                  <span>Manage</span>
                  <span className="admin-stat-arrow">→</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
