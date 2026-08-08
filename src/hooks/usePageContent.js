import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../api'

// Module-level cache so every component that calls usePageContent shares ONE
// fetch of the content collection instead of one fetch per component.
// We store a Promise so parallel callers don't issue duplicate requests.
let _contentCache = null  // Array<block> once loaded
let _inflight = null      // Promise while loading

/** Force-clear the cache (called after admin saves a content block). */
export function invalidateContentCache() {
  _contentCache = null
  _inflight = null
}

function loadAllContent() {
  if (_contentCache) return Promise.resolve(_contentCache)
  if (!_inflight) {
    _inflight = api.resources
      .list('content')
      .then((list) => {
        _contentCache = Array.isArray(list) ? list : []
        _inflight = null
        return _contentCache
      })
      .catch((err) => {
        _inflight = null
        throw err
      })
  }
  return _inflight
}

// Global listener list — lets ContentPage notify all usePageContent instances
// when a block is saved, so the website reflects changes immediately.
const _listeners = new Set()

export function notifyContentUpdate(updatedBlock) {
  if (_contentCache) {
    const idx = _contentCache.findIndex(
      (b) => b._id === updatedBlock._id || (b.page === updatedBlock.page && b.key === updatedBlock.key)
    )
    if (idx >= 0) {
      _contentCache = _contentCache.map((b, i) => (i === idx ? { ...b, ...updatedBlock } : b))
    } else {
      _contentCache = [..._contentCache, updatedBlock]
    }
  }
  for (const fn of _listeners) fn()
}

export function notifyContentDelete(deletedId) {
  if (_contentCache) {
    _contentCache = _contentCache.filter((b) => b._id !== deletedId)
  }
  for (const fn of _listeners) fn()
}

/**
 * usePageContent — loads the editable content blocks for one page from MongoDB
 * and returns helpers to read them. Every visible text/image on the site is a
 * content block ({ page, key, value, type }); pages render them via `t()`.
 *
 * The `fallback` arguments are the current value and only serve as the
 * initial / offline default — the live source of truth is MongoDB, so admin
 * edits appear on the site automatically.
 *
 * @param {string} page   content page name, e.g. 'about', 'footer'
 */
export function usePageContent(page, fallbackBlocks = []) {
  const [allBlocks, setAllBlocks] = useState(_contentCache || null)
  const [, forceRender] = useState(0)

  // Register for push notifications from the admin
  useEffect(() => {
    const listener = () => {
      setAllBlocks(_contentCache ? [..._contentCache] : null)
      forceRender((n) => n + 1)
    }
    _listeners.add(listener)
    return () => _listeners.delete(listener)
  }, [])

  // Fetch on mount if not yet cached
  useEffect(() => {
    let cancelled = false
    if (_contentCache) {
      setAllBlocks([..._contentCache])
      return
    }
    loadAllContent()
      .then((list) => {
        if (cancelled) return
        setAllBlocks([...list])
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [page])

  const blocks = useMemo(
    () => (Array.isArray(allBlocks) ? allBlocks.filter((b) => b.page === page) : fallbackBlocks),
    [allBlocks, page, fallbackBlocks]
  )

  const byKey = useMemo(() => {
    const map = {}
    for (const b of blocks) map[b.key] = b.value
    return map
  }, [blocks])

  /** Single text value. */
  const t = useCallback((key, fallback = '') => {
    const v = byKey[key]
    return v === undefined || v === '' ? fallback : v
  }, [byKey])

  /** Image URL (same as t but reads as an <img src>). */
  const img = useCallback((key, fallback = '') => t(key, fallback), [t])

  /** Newline-delimited list of items (one per line in the admin editor). */
  const tList = useCallback((key, fallback = []) => {
    const v = byKey[key]
    if (v === undefined || v === '') return fallback
    return v
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  }, [byKey])

  return { t, img, tList, blocks }
}
