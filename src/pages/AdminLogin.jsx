import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, setToken } from '../api'
import { usePageTitle } from '../hooks/usePageTitle'

/**
 * AdminLogin — exact UI implementation matching reference screenshot:
 * Centered white card with serif "College Login" header, academic subtitle,
 * rounded input fields, dark charcoal "Sign In" button, and administration footer.
 */
export default function AdminLogin() {
  usePageTitle('College Login — Satara Polytechnic')
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await api.login(email, password)
      setToken(token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f6f5f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 20,
          padding: '48px 40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          boxSizing: 'border-box',
        }}
      >
        {/* Title & Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 36,
              fontWeight: 700,
              color: '#0f172a',
              margin: '0 0 6px 0',
              letterSpacing: '-0.02em',
            }}
          >
            College Login
          </h1>
          <p
            style={{
              fontSize: 14,
              color: '#64748b',
              margin: 0,
              fontWeight: 400,
            }}
          >
            Academic &amp; Administrative Access
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 10,
              padding: '12px 14px',
              fontSize: 13,
              color: '#b91c1c',
              marginBottom: 24,
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 500,
                color: '#334155',
                marginBottom: 8,
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="username"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: 12,
                fontSize: 15,
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#64748b'
                e.target.style.boxShadow = '0 0 0 3px rgba(100,116,139,0.12)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#cbd5e1'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 500,
                color: '#334155',
                marginBottom: 8,
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: 12,
                fontSize: 15,
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#64748b'
                e.target.style.boxShadow = '0 0 0 3px rgba(100,116,139,0.12)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#cbd5e1'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#64748b' : '#18181b',
              border: 'none',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              color: '#ffffff',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 8,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.background = '#000000'
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.background = '#18181b'
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Footer info */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
            Authorized personnel only
          </p>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 0' }}>
            © 2026 College Administration
          </p>
          <div style={{ marginTop: 16 }}>
            <Link
              to="/"
              style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target.style.color = '#0f172a')}
              onMouseLeave={(e) => (e.target.style.color = '#64748b')}
            >
              ← Back to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
