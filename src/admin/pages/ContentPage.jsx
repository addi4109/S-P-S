import { useEffect, useMemo, useState } from 'react'
import { useResource } from '../../hooks/useResource'
import { staticFallbacks } from '../../data/staticFallbacks'
import { notifyContentUpdate, notifyContentDelete, invalidateContentCache } from '../../hooks/usePageContent'
import ImageUploader from '../components/ImageUploader'
import Spinner from '../../components/ui/Spinner'

const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'principalDesk', label: "Principal's Desk" },
  { id: 'placement', label: 'Placement' },
  { id: 'grievance', label: 'Grievance' },
  { id: 'admission', label: 'Admission' },
  { id: 'header', label: 'Header' },
  { id: 'footer', label: 'Footer' },
]

/** 'heroTitle' → 'Hero Title', 'mapEmbed' → 'Map Embed'. */
function prettify(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function TypeBadge({ type }) {
  const cls = {
    text: 'admin-badge-type admin-badge-type-text',
    textarea: 'admin-badge-type admin-badge-type-textarea',
    image: 'admin-badge-type admin-badge-type-image',
  }[type] || 'admin-badge-type admin-badge-type-text'
  return <span className={cls}>{type}</span>
}

/** One editable block: label + editor (image uploader / textarea) + Save/Delete. */
function BlockEditor({ block, onSave, onDelete }) {
  const [value, setValue] = useState(block.value || '')
  const [saving, setSaving] = useState(false)

  useEffect(() => setValue(block.value || ''), [block._id, block.value])

  const dirty = value !== (block.value || '')

  async function save() {
    setSaving(true)
    try {
      await onSave({ ...block, value })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-block-card">
      <div className="admin-block-card-header">
        <label className="admin-block-key">{prettify(block.key)}</label>
        <TypeBadge type={block.type} />
      </div>
      {block.type === 'image' ? (
        <ImageUploader value={value} onChange={setValue} />
      ) : (
        <textarea
          rows={block.type === 'textarea' ? 4 : 2}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="admin-textarea"
        />
      )}
      <div className="admin-block-actions">
        <button
          onClick={() => onDelete(block)}
          className="admin-btn admin-btn-danger admin-btn-sm"
        >
          Delete
        </button>
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="admin-btn admin-btn-primary admin-btn-sm"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  )
}

/**
 * ContentPage — edit every text/image on the site.
 * Renders page cards in a grid layout (like dashboard stat cards) to select a page.
 */
export default function ContentPage() {
  const { data, loading, live, create, update, remove } = useResource(
    'content',
    staticFallbacks.content || []
  )
  const [selectedPage, setSelectedPage] = useState(null) // null = show page cards grid
  const [showAdd, setShowAdd] = useState(false)
  const [newBlock, setNewBlock] = useState({ key: '', type: 'textarea' })
  const [busy, setBusy] = useState(false)

  // Compute block counts per page
  const pageCounts = useMemo(() => {
    const counts = {}
    if (Array.isArray(data)) {
      for (const b of data) {
        if (b.page) counts[b.page] = (counts[b.page] || 0) + 1
      }
    }
    return counts
  }, [data])

  const blocks = useMemo(
    () => (selectedPage && Array.isArray(data) ? data.filter((b) => b.page === selectedPage) : []),
    [data, selectedPage]
  )

  async function onSave(block) {
    const payload = { page: block.page, key: block.key, value: block.value, type: block.type }
    try {
      let saved
      if (block._id) {
        saved = await update(block._id, payload)
        notifyContentUpdate(saved || { ...block, value: block.value })
      } else {
        saved = await create(payload)
        invalidateContentCache()
      }
    } catch (e) {
      window.alert(e.message)
    }
  }

  async function onDelete(block) {
    if (!window.confirm(`Delete "${block.key}"?`)) return
    try {
      await remove(block._id)
      notifyContentDelete(block._id)
    } catch (e) {
      window.alert(e.message)
    }
  }

  async function onAdd() {
    if (!selectedPage || !newBlock.key.trim()) return
    setBusy(true)
    try {
      const saved = await create({ page: selectedPage, key: newBlock.key.trim(), value: '', type: newBlock.type })
      invalidateContentCache()
      notifyContentUpdate(saved || { page: selectedPage, key: newBlock.key.trim(), value: '', type: newBlock.type })
      setNewBlock({ key: '', type: 'textarea' })
      setShowAdd(false)
    } catch (e) {
      window.alert(e.message)
    } finally {
      setBusy(false)
    }
  }

  const currentPage = PAGES.find((p) => p.id === selectedPage)

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            {selectedPage ? `${currentPage ? currentPage.label : selectedPage} Content` : 'Content Pages'}
          </h2>
          <p className="admin-page-subtitle">
            {selectedPage ? (
              `Editing content blocks for ${currentPage ? currentPage.label : selectedPage}`
            ) : (
              `Select a page card below to manage its text, headings, and images.`
            )}{' '}
            {live ? (
              <span style={{ color: '#16a34a' }}>✓ Synced with MongoDB.</span>
            ) : (
              <span style={{ color: '#d97706' }}>⚠ Showing static fallback — MongoDB offline.</span>
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {selectedPage ? (
            <>
              <button
                onClick={() => { setSelectedPage(null); setShowAdd(false) }}
                className="admin-btn admin-btn-secondary"
              >
                ← Back to Page List
              </button>
              <button
                onClick={() => setShowAdd((v) => !v)}
                className="admin-btn admin-btn-primary"
              >
                + Add Block
              </button>
            </>
          ) : null}
        </div>
      </div>

      {loading ? (
        <div className="admin-spinner-wrap">
          <div className="admin-spinner" />
          Loading content…
        </div>
      ) : !selectedPage ? (
        /* ── Page Cards Grid (matching Dashboard stat cards design) ── */
        <div className="admin-stat-grid">
          {PAGES.map((p) => {
            const count = pageCounts[p.id] || 0
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPage(p.id)}
                className="admin-stat-card-plain"
              >
                <div className="admin-stat-card-top">
                  <h3 className="admin-stat-plain-title">{p.label}</h3>
                  <span className="admin-stat-plain-count">{count}</span>
                </div>
                <div className="admin-stat-plain-footer">
                  <span>Manage</span>
                  <span className="admin-stat-arrow">→</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* ── Selected Page Block Management ── */
        <div className="admin-block-cards">
          {/* Add block form */}
          {showAdd && (
            <div className="admin-add-block-card">
              <p className="admin-add-block-title">
                Add new block to "{currentPage ? currentPage.label : selectedPage}"
              </p>
              <div className="admin-add-block-row">
                <input
                  value={newBlock.key}
                  onChange={(e) => setNewBlock({ ...newBlock, key: e.target.value })}
                  placeholder="key, e.g. introHeading"
                  className="admin-input"
                  style={{ flex: 1, minWidth: 160 }}
                  onKeyDown={(e) => e.key === 'Enter' && onAdd()}
                />
                <select
                  value={newBlock.type}
                  onChange={(e) => setNewBlock({ ...newBlock, type: e.target.value })}
                  className="admin-select"
                  style={{ width: 130 }}
                >
                  <option value="textarea">Textarea</option>
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                </select>
                <button
                  onClick={onAdd}
                  disabled={busy || !newBlock.key.trim()}
                  className="admin-btn admin-btn-primary"
                >
                  {busy ? 'Adding…' : 'Add'}
                </button>
                <button
                  onClick={() => setShowAdd(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {blocks.length ? (
            blocks.map((b) => (
              <BlockEditor key={b._id || b.key} block={b} onSave={onSave} onDelete={onDelete} />
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              background: 'white',
              border: '2px dashed #cbd5e1',
              borderRadius: 8,
              color: '#64748b',
              fontSize: 14,
            }}>
              No blocks for this page yet. Click "+ Add Block" above to create one.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
