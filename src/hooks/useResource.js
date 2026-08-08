import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../api'

/**
 * Global in-memory cache for resource lists.
 * Structure: { [resourceName]: { data: Array, listeners: Set<fn> } }
 *
 * When the admin creates / updates / deletes a record, we update this cache
 * and notify every component that called useResource() for that resource —
 * including components on other routes (e.g. the public website pages). This
 * means admin edits are reflected instantly across the whole app without any
 * page refresh.
 */
const _store = {}

function getEntry(name) {
  if (!_store[name]) {
    _store[name] = { data: null, listeners: new Set(), inflight: null }
  }
  return _store[name]
}

function notify(name) {
  const entry = _store[name]
  if (!entry) return
  for (const fn of entry.listeners) fn(entry.data)
}

/** Force-refresh a resource from the server (e.g. after seed/reset). */
export async function refreshResource(name) {
  const entry = getEntry(name)
  entry.data = null
  entry.inflight = null
  const list = await api.resources.list(name)
  if (Array.isArray(list)) {
    entry.data = list
    notify(name)
  }
}

/**
 * useResource — fetch one resource collection from the API with a static
 * fallback. When the API/MongoDB is unreachable the component keeps serving
 * `staticFallback`; `live` tells the caller whether the data is from MongoDB.
 *
 * All instances share a single fetch per resource name. Admin CRUD operations
 * update the shared cache and notify every subscribed component.
 *
 * @param {string} resourceName  e.g. 'departments', 'staff', 'gallery'
 * @param {Array}  staticFallback  the src/data module (served when offline)
 */
export function useResource(resourceName, staticFallback = []) {
  const entry = getEntry(resourceName)
  const [data, setData] = useState(entry.data ?? staticFallback)
  const [loading, setLoading] = useState(!entry.data)
  const [live, setLive] = useState(Boolean(entry.data))
  const [error, setError] = useState('')
  const mountedRef = useRef(true)

  // Subscribe to global store changes for this resource
  useEffect(() => {
    mountedRef.current = true
    const listener = (newData) => {
      if (!mountedRef.current) return
      if (Array.isArray(newData)) {
        setData(newData)
        setLive(true)
        setLoading(false)
      }
    }
    entry.listeners.add(listener)
    return () => {
      mountedRef.current = false
      entry.listeners.delete(listener)
    }
  }, [resourceName]) // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch on mount if not already in cache
  useEffect(() => {
    const entry = getEntry(resourceName)

    // Already loaded by another component — use cached data immediately
    if (entry.data) {
      setData(entry.data)
      setLive(true)
      setLoading(false)
      return
    }

    // Already fetching — wait for the shared promise
    if (entry.inflight) {
      entry.inflight
        .then((list) => {
          if (!mountedRef.current) return
          if (Array.isArray(list)) {
            setData(list)
            setLive(true)
            setError('')
          }
        })
        .catch((e) => {
          if (!mountedRef.current) return
          setLive(false)
          setError(e.message)
        })
        .finally(() => {
          if (mountedRef.current) setLoading(false)
        })
      return
    }

    // First fetch for this resource
    setLoading(true)
    entry.inflight = api.resources
      .list(resourceName)
      .then((list) => {
        entry.inflight = null
        if (Array.isArray(list)) {
          entry.data = list
          notify(resourceName)
          if (mountedRef.current) {
            setData(list)
            setLive(true)
            setError('')
          }
        } else {
          throw new Error('Unexpected payload')
        }
        return list
      })
      .catch((e) => {
        entry.inflight = null
        if (mountedRef.current) {
          setLive(false)
          setError(e.message)
        }
        return staticFallback
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false)
      })
  }, [resourceName]) // eslint-disable-line react-hooks/exhaustive-deps

  /** Refresh from server (bypasses cache). */
  const refresh = useCallback(async () => {
    const entry = getEntry(resourceName)
    entry.data = null
    entry.inflight = null
    setLoading(true)
    try {
      const list = await api.resources.list(resourceName)
      if (!Array.isArray(list)) throw new Error('Unexpected payload')
      entry.data = list
      notify(resourceName)
      if (mountedRef.current) {
        setData(list)
        setLive(true)
        setError('')
      }
    } catch (e) {
      if (mountedRef.current) {
        setLive(false)
        setError(e.message)
      }
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [resourceName])

  /** Create a new document and update cache globally. */
  const create = useCallback(async (values) => {
    const doc = await api.resources.create(resourceName, values)
    const entry = getEntry(resourceName)
    if (entry.data) {
      entry.data = [...entry.data, doc]
    } else {
      entry.data = [doc]
    }
    notify(resourceName)
    setLive(true)
    return doc
  }, [resourceName])

  /** Update a document and propagate to all subscribers. */
  const update = useCallback(async (id, values) => {
    const doc = await api.resources.update(resourceName, id, values)
    const entry = getEntry(resourceName)
    if (entry.data) {
      entry.data = entry.data.map((d) => (d._id === id ? doc : d))
      notify(resourceName)
    }
    return doc
  }, [resourceName])

  /** Delete a document and propagate to all subscribers. */
  const remove = useCallback(async (id) => {
    await api.resources.remove(resourceName, id)
    const entry = getEntry(resourceName)
    if (entry.data) {
      entry.data = entry.data.filter((d) => d._id !== id)
      notify(resourceName)
    }
  }, [resourceName])

  return { data, loading, live, error, refresh, create, update, remove }
}
