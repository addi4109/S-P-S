import { useEffect, useMemo, useState } from 'react'
import { useResource } from '../../hooks/useResource'
import { staticFallbacks } from '../../data/staticFallbacks'

/** Prettify camelCase key -> 'Office Timings' */
function prettify(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/** Predefined categories for grouping settings cleanly */
const CATEGORIES = [
  {
    id: 'general',
    title: 'General Information',
    subtitle: 'Institute identity, organization name, and copyright info.',
    keys: ['name', 'shortName', 'society', 'copyrightYear', 'builtBy'],
  },
  {
    id: 'ticker',
    title: 'Homepage Ticker Announcement',
    subtitle: 'Text displayed on the scrolling news ticker banner under the homepage hero.',
    keys: ['ticker'],
  },
  {
    id: 'contact',
    title: 'Contact & Location Info',
    subtitle: 'Campus address, phone numbers, office hours, and Google Map embed URL.',
    keys: ['address', 'phones', 'officeTimings', 'mapEmbedUrl'],
  },
]

/** Fields that use multi-line textarea */
const TEXTAREA_KEYS = new Set(['ticker', 'address', 'phones', 'mapEmbedUrl'])

export default function SettingsPage() {
  const { data, loading, live, update, create, remove } = useResource(
    'settings',
    staticFallbacks.settings || []
  )

  const [drafts, setDrafts] = useState({})
  const [savingKey, setSavingKey] = useState(null)
  const [savedKey, setSavedKey] = useState(null)
  const [savingAll, setSavingAll] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newSetting, setNewSetting] = useState({ key: '', value: '' })

  const settingsList = useMemo(() => (Array.isArray(data) ? data : []), [data])

  // Map settings to lookup by key
  const settingsMap = useMemo(() => {
    const map = {}
    for (const s of settingsList) map[s.key] = s
    return map
  }, [settingsList])

  // Initialize draft values
  useEffect(() => {
    if (!settingsList.length) return
    setDrafts((prev) => {
      const next = { ...prev }
      for (const s of settingsList) {
        if (next[s.key] === undefined) next[s.key] = s.value ?? ''
      }
      return next
    })
  }, [settingsList])

  const setDraft = (key, val) => setDrafts((prev) => ({ ...prev, [key]: val }))

  const isDirty = (key) => {
    const orig = settingsMap[key]?.value ?? ''
    return (drafts[key] ?? '') !== orig
  }

  async function handleSaveSingle(key) {
    setSavingKey(key)
    const existing = settingsMap[key]
    const val = drafts[key] ?? ''
    try {
      if (existing && existing._id) {
        await update(existing._id, { key, value: val })
      } else {
        await create({ key, value: val })
      }
      setSavedKey(key)
      setTimeout(() => setSavedKey(null), 2500)
    } catch (err) {
      alert(err.message || 'Failed to save setting')
    } finally {
      setSavingKey(null)
    }
  }

  async function handleSaveAll() {
    setSavingAll(true)
    try {
      for (const s of settingsList) {
        const val = drafts[s.key] ?? s.value ?? ''
        if (val !== s.value) {
          await update(s._id, { key: s.key, value: val })
        }
      }
      setSavedKey('all')
      setTimeout(() => setSavedKey(null), 2500)
    } catch (err) {
      alert(err.message || 'Failed to save all settings')
    } finally {
      setSavingAll(false)
    }
  }

  async function handleAddCustomSetting() {
    if (!newSetting.key.trim()) return
    const key = newSetting.key.trim().replace(/\s+/g, '')
    try {
      await create({ key, value: newSetting.value || '' })
      setNewSetting({ key: '', value: '' })
      setShowAddModal(false)
    } catch (err) {
      alert(err.message)
    }
  }

  async function handleDeleteSetting(setting) {
    if (!window.confirm(`Delete setting "${setting.key}"?`)) return
    try {
      await remove(setting._id)
    } catch (err) {
      alert(err.message)
    }
  }

  // Find keys that are not categorized in standard groups
  const categorizedKeys = new Set(CATEGORIES.flatMap((c) => c.keys))
  const customSettings = settingsList.filter((s) => !categorizedKeys.has(s.key))

  return (
    <div style={{ maxWidth: 960 }}>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Site Settings</h2>
          <p className="admin-page-subtitle">
            Manage global site configuration, announcement ticker, and contact details.{' '}
            {live ? (
              <span style={{ color: '#16a34a' }}>✓ Synced with MongoDB.</span>
            ) : (
              <span style={{ color: '#d97706' }}>⚠ Showing static fallback — MongoDB offline.</span>
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setShowAddModal(true)}
            className="admin-btn admin-btn-secondary"
          >
            + Add Custom Setting
          </button>
          <button
            onClick={handleSaveAll}
            disabled={savingAll}
            className="admin-btn admin-btn-primary"
          >
            {savingAll ? 'Saving All…' : savedKey === 'all' ? '✓ All Saved' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="admin-spinner-wrap">
          <div className="admin-spinner" />
          Loading settings…
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* ── Grouped Categories ── */}
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
                padding: 24,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: 13, color: '#64748b', margin: '3px 0 0' }}>
                  {cat.subtitle}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {cat.keys.map((key) => {
                  const setting = settingsMap[key] || { key, value: '' }
                  const val = drafts[key] ?? setting.value ?? ''
                  const dirty = isDirty(key)
                  const isTextarea = TEXTAREA_KEYS.has(key)

                  return (
                    <div key={key} className="admin-form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <label className="admin-label" style={{ marginBottom: 0 }}>
                          {prettify(key)} <span style={{ color: '#94a3b8', fontWeight: 400, textTransform: 'none' }}>({key})</span>
                        </label>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {savedKey === key && (
                            <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>✓ Saved</span>
                          )}
                          {dirty && (
                            <button
                              type="button"
                              onClick={() => handleSaveSingle(setting)}
                              disabled={savingKey === key}
                              className="admin-btn admin-btn-primary admin-btn-sm"
                            >
                              {savingKey === key ? 'Saving…' : 'Save'}
                            </button>
                          )}
                        </div>
                      </div>

                      {isTextarea ? (
                        <textarea
                          rows={key === 'ticker' ? 4 : key === 'address' ? 3 : 2}
                          value={val}
                          onChange={(e) => setDraft(key, e.target.value)}
                          className="admin-textarea"
                          placeholder={`Enter ${prettify(key).toLowerCase()}…`}
                        />
                      ) : (
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => setDraft(key, e.target.value)}
                          className="admin-input"
                          placeholder={`Enter ${prettify(key).toLowerCase()}…`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* ── Custom / Additional Settings Section (if any exist) ── */}
          {customSettings.length > 0 && (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
                padding: 24,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Custom / Additional Settings
                </h3>
                <p style={{ fontSize: 13, color: '#64748b', margin: '3px 0 0' }}>
                  Additional user-defined site variables and keys.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {customSettings.map((setting) => {
                  const key = setting.key
                  const val = drafts[key] ?? setting.value ?? ''
                  const dirty = isDirty(key)

                  return (
                    <div key={setting._id || key} className="admin-form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <label className="admin-label" style={{ marginBottom: 0 }}>
                          {prettify(key)} <span style={{ color: '#94a3b8', fontWeight: 400, textTransform: 'none' }}>({key})</span>
                        </label>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {savedKey === key && (
                            <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>✓ Saved</span>
                          )}
                          {dirty && (
                            <button
                              type="button"
                              onClick={() => handleSaveSingle(setting)}
                              disabled={savingKey === key}
                              className="admin-btn admin-btn-primary admin-btn-sm"
                            >
                              {savingKey === key ? 'Saving…' : 'Save'}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteSetting(setting)}
                            className="admin-btn admin-btn-danger admin-btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        value={val}
                        onChange={(e) => setDraft(key, e.target.value)}
                        className="admin-textarea"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Add Custom Setting Modal ── */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Add Custom Setting</h3>
              <button onClick={() => setShowAddModal(false)} className="admin-modal-close">✕</button>
            </div>

            <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="admin-form-group">
                <label className="admin-label">Setting Key (camelCase or lowercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. emergencyContact"
                  value={newSetting.key}
                  onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Value</label>
                <textarea
                  rows={3}
                  placeholder="Setting value…"
                  value={newSetting.value}
                  onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                  className="admin-textarea"
                />
              </div>

              <div className="admin-form-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCustomSetting}
                  disabled={!newSetting.key.trim()}
                  className="admin-btn admin-btn-primary"
                >
                  Add Setting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
