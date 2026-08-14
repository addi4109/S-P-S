/**
 * api — thin fetch client for the SPS backend (Express + MongoDB).
 * Base URL comes from VITE_API_URL (see .env / .env.example).
 */
const BASE = ''

async function request(path, options = {}) {
  const token = getToken()
  const isForm = typeof FormData !== 'undefined' && options.body instanceof FormData
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      // For FormData, let the browser set the multipart boundary.
      ...(isForm ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`)
    err.status = res.status
    throw err
  }
  return data
}

export const api = {
  base: BASE,

  /** POST /api/login — returns { token, user }. Accepts email or username. */
  login: (email, password) =>
    request('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  /** GET /api/me — validates the stored token. */
  me: () => request('/api/me'),

  /** GET /api/status — { mongodb, cloudinary } connectivity. */
  getStatus: () => request('/api/status'),

  /** GET /api/notices — newest first. */
  getNotices: () => request('/api/notices'),

  /** GET /api/data — all site collections in one call. */
  getData: () => request('/api/data'),

  /** Generic CRUD for /api/resources/:name. */
  resources: {
    list: (name) => request(`/api/resources/${name}`),
    get: (name, id) => request(`/api/resources/${name}/${id}`),
    create: (name, data) =>
      request(`/api/resources/${name}`, { method: 'POST', body: JSON.stringify(data) }),
    update: (name, id, data) =>
      request(`/api/resources/${name}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (name, id) => request(`/api/resources/${name}/${id}`, { method: 'DELETE' }),
    /** Re-seed all collections from the static data modules. */
    reset: () => request('/api/resources/reset', { method: 'POST' }),
  },

  /** POST /api/upload — upload an image to Cloudinary → { url }. */
  upload: (file) => {
    const form = new FormData()
    form.append('file', file)
    return request('/api/upload', { method: 'POST', body: form })
  },
}

export function getToken() {
  return localStorage.getItem('sps_token')
}

export function setToken(token) {
  if (token) localStorage.setItem('sps_token', token)
  else localStorage.removeItem('sps_token')
}
