import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, getToken, setToken } from '../api'

/**
 * RequireAdmin — guards the admin panel. Validates the stored token against
 * /api/me; redirects to the login page when missing or expired.
 */
export default function RequireAdmin({ children }) {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!getToken()) {
      navigate('/admin', { replace: true })
      return
    }
    api
      .me()
      .then(() => setChecking(false))
      .catch(() => {
        setToken(null)
        navigate('/admin', { replace: true })
      })
  }, [navigate])

  if (checking) {
    return (
      <div className="min-h-screen bg-[#f4f1ec] flex items-center justify-center">
        <p className="text-gray-500 text-sm">Checking session…</p>
      </div>
    )
  }
  return children
}
