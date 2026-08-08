import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useResource } from '../../hooks/useResource'
import { getResourceConfig } from '../../config/resources'
import { staticFallbacks } from '../../data/staticFallbacks'
import ResourceCards from '../components/ResourceCards'
import ResourceForm from '../components/ResourceForm'
import StaffForm from '../components/StaffForm'
import DepartmentForm from '../components/DepartmentForm'
import ConfirmDialog from '../components/ConfirmDialog'
import StaffAdminCard from '../components/StaffAdminCard'
import GoverningBodyAdminCard from '../components/GoverningBodyAdminCard'
import GoverningBodyForm from '../components/GoverningBodyForm'
import NoticeForm from '../components/NoticeForm'
import Spinner from '../../components/ui/Spinner'

/**
 * ResourcePage — one generic CRUD screen for any resource, driven by
 * src/config/resources.js. Items are shown as frontend-style cards with
 * Edit/Delete; the add/edit form opens in a modal. When the config declares a
 * `groupBy` field (e.g. staff by department) the cards are filtered by a
 * dropdown and grouped under section headers.
 */
export default function ResourcePage() {
  const { resource } = useParams()
  const config = getResourceConfig(resource)
  const { data, loading, live, error, create, update, remove } = useResource(
    resource,
    staticFallbacks[resource] || []
  )

  const [editing, setEditing] = useState(null) // null | {} (new) | row (edit)
  const [deleting, setDeleting] = useState(null)
  const [saving, setSaving] = useState(false)
  const [actionError, setActionError] = useState('')

  // Grouping (e.g. staff by department)
  const groupField = config?.groupBy?.field
  const groupOptions = config?.fields.find((f) => f.name === groupField)?.options || []
  const [groupFilter, setGroupFilter] = useState('')

  const groups = useMemo(() => {
    if (!groupField) return null
    const rows = Array.isArray(data) ? data : []
    const map = {}
    for (const row of rows) {
      const key = row[groupField] || ''
      ;(map[key] = map[key] || []).push(row)
    }
    const order = groupOptions.map((o) => o.value)
    return Object.keys(map)
      .sort((a, b) => {
        const ia = order.indexOf(a)
        const ib = order.indexOf(b)
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib) || a.localeCompare(b)
      })
      .map((key) => ({
        key,
        label: (groupOptions.find((o) => o.value === key) || {}).label || key || 'Other',
        rows: map[key],
      }))
  }, [data, groupField, groupOptions])

  // When a specific group is selected, show just its rows.
  const filteredRows = groupFilter
    ? (Array.isArray(data) ? data : []).filter((row) => row[groupField] === groupFilter)
    : null

  if (!config) {
    return <p style={{ color: '#6b7280', padding: 24 }}>Unknown resource "{resource}".</p>
  }

  // Resources that get their own frontend-matching card design.
  const renderStaffCard = (row) => <StaffAdminCard key={row._id} member={row} onEdit={setEditing} onDelete={setDeleting} />
  const renderGovCard = (row) => <GoverningBodyAdminCard key={row._id} member={row} onEdit={setEditing} onDelete={setDeleting} />
  const customRenderers = { staff: renderStaffCard, governingBody: renderGovCard }
  const staffRenderItem = customRenderers[resource]

  async function handleSubmit(values) {
    setSaving(true)
    setActionError('')
    try {
      if (editing && editing._id) await update(editing._id, values)
      else await create(values)
      setEditing(null)
    } catch (e) {
      setActionError(e.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    try {
      await remove(deleting._id)
      setDeleting(null)
    } catch (e) {
      setActionError(e.message)
    }
  }

  const sectionHeader = (title, count) => (
    <div className="admin-section-header">
      <h4 className="admin-section-title">{title}</h4>
      <span className="admin-section-count">{count} {count === 1 ? 'member' : 'members'}</span>
    </div>
  )

  return (
    <div>
      {/* ── Page header ── */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">{config.label}</h2>
          <p className="admin-page-subtitle">
            {live ? (
              <span style={{ color: '#10b981' }}>✓ Synced with MongoDB</span>
            ) : (
              <span style={{ color: '#f59e0b' }}>⚠ Showing static fallback — MongoDB offline</span>
            )}
            {error ? <span style={{ color: '#ef4444' }}> · {error}</span> : ''}
          </p>
        </div>
        <button
          onClick={() => setEditing(groupFilter ? { [groupField]: groupFilter } : {})}
          className="admin-btn admin-btn-primary"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" style={{width:15,height:15}}>
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
          Add {config.singular}
        </button>
      </div>

      {/* ── Action error ── */}
      {actionError && (
        <div className="admin-alert admin-alert-error">
          <span>⚠</span>
          <span>{actionError}</span>
        </div>
      )}

      {/* ── Content ── */}
      {loading ? (
        <div className="admin-spinner-wrap">
          <div className="admin-spinner" />
          Loading {config.label.toLowerCase()}…
        </div>
      ) : groupField ? (
        <>
          {/* Group filter */}
          <div className="admin-filter-row">
            <span className="admin-filter-label">{config.groupBy.label}:</span>
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="admin-filter-select"
            >
              <option value="">All {config.label}</option>
              {groupOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {groupFilter ? (
            <>
              {sectionHeader(
                (groupOptions.find((o) => o.value === groupFilter) || {}).label || groupFilter,
                filteredRows.length
              )}
              <ResourceCards
                config={config}
                rows={filteredRows}
                onEdit={setEditing}
                onDelete={setDeleting}
                renderItem={staffRenderItem}
              />
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {groups.map((g) => (
                <div key={g.key}>
                  {sectionHeader(g.label, g.rows.length)}
                  <ResourceCards config={config} rows={g.rows} onEdit={setEditing} onDelete={setDeleting} renderItem={staffRenderItem} />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <ResourceCards config={config} rows={data} onEdit={setEditing} onDelete={setDeleting} renderItem={staffRenderItem} />
      )}

      {/* ── Add / edit modal ── */}
      {editing && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editing._id ? `Edit ${config.singular}` : `Add ${config.singular}`}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="admin-modal-close"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              {resource === 'staff' ? (
                <StaffForm
                  initial={editing._id ? editing : null}
                  onSubmit={handleSubmit}
                  onCancel={() => setEditing(null)}
                  submitting={saving}
                />
              ) : resource === 'departments' ? (
                <DepartmentForm
                  initial={editing._id ? editing : null}
                  onSubmit={handleSubmit}
                  onCancel={() => setEditing(null)}
                  submitting={saving}
                />
              ) : resource === 'governingBody' ? (
                <GoverningBodyForm
                  initial={editing._id ? editing : null}
                  onSubmit={handleSubmit}
                  onCancel={() => setEditing(null)}
                  submitting={saving}
                />
              ) : resource === 'notices' ? (
                <NoticeForm
                  initial={editing._id ? editing : null}
                  onSubmit={handleSubmit}
                  onCancel={() => setEditing(null)}
                  submitting={saving}
                />
              ) : (
                <ResourceForm
                  config={config}
                  initial={editing._id ? editing : null}
                  onSubmit={handleSubmit}
                  onCancel={() => setEditing(null)}
                  submitting={saving}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${config.singular}?`}
        message={deleting ? deleting[config.listField] || '' : ''}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  )
}
