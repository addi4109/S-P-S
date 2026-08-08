import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import GoverningBody from './pages/GoverningBody'
import PrincipalDesk from './pages/PrincipalDesk'
import Departments from './pages/Departments'
import DepartmentDetail from './pages/DepartmentDetail'
import Gallery from './pages/Gallery'
import Placement from './pages/Placement'
import Grievance from './pages/Grievance'
import Admission from './pages/Admission'
import Notice from './pages/Notice'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import RequireAdmin from './admin/RequireAdmin'
import Dashboard from './admin/pages/Dashboard'
import VirtualView from './admin/pages/VirtualView'
import ResourcePage from './admin/pages/ResourcePage'
import ContentPage from './admin/pages/ContentPage'
import SettingsPage from './admin/pages/SettingsPage'

/** Scrolls to the top whenever the route changes. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/governing-body" element={<GoverningBody />} />
          <Route path="/principal-desk" element={<PrincipalDesk />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:slug" element={<DepartmentDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/placement" element={<Placement />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Admin — standalone login + protected panel */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/preview" element={<VirtualView />} />
          {/* Dedicated editors for settings and content; other resources use the generic page. */}
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/content" element={<ContentPage />} />
          <Route path="/admin/:resource" element={<ResourcePage />} />
        </Route>
      </Routes>
    </>
  )
}
