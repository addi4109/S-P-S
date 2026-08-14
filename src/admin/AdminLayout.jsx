import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { RESOURCES } from '../config/resources'
import { setToken } from '../api'
import { useResource } from '../hooks/useResource'
import { departments as staticDepartments } from '../data/departments'
import '../styles/admin.css'

const primaryNav = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/preview', label: 'Virtual View' },
]

const resourceNav = Object.keys(RESOURCES).map((name) => ({
  to: `/admin/${name}`,
  label: RESOURCES[name].label,
  name,
}))

export default function AdminLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Pre-fetch departments so the live list is always in cache for Staff, forms, etc.
  useResource('departments', staticDepartments)

  const all = [...primaryNav, ...resourceNav]
  const current = all.find((n) => pathname === n.to || pathname.startsWith(n.to + '/'))
  const title = current ? current.label : 'Admin'

  function logout() {
    setToken(null)
    navigate('/admin', { replace: true })
  }

  return (
    <div className="admin-root">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-brand-text">
            <p className="admin-sidebar-name">SPS Admin</p>
            <p className="admin-sidebar-sub">Satara Polytechnic</p>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {/* Primary */}
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-item${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}

          <p className="admin-sidebar-section">Resources</p>

          {/* Resource nav */}
          {resourceNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-item${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={logout} className="admin-nav-item admin-logout-btn">
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-topbar-title">{title}</h1>
          <div className="admin-topbar-actions">
            <a href="/" target="_blank" rel="noopener noreferrer" className="admin-topbar-link">
              View Site ↗
            </a>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
