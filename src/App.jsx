import { useEffect, Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

const Layout = lazy(() => import('./components/layout/Layout'))
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const GoverningBody = lazy(() => import('./pages/GoverningBody'))
const PrincipalDesk = lazy(() => import('./pages/PrincipalDesk'))
const Departments = lazy(() => import('./pages/Departments'))
const DepartmentDetail = lazy(() => import('./pages/DepartmentDetail'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Placement = lazy(() => import('./pages/Placement'))
const Grievance = lazy(() => import('./pages/Grievance'))
const Admission = lazy(() => import('./pages/Admission'))
const Notice = lazy(() => import('./pages/Notice'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminLayout = lazy(() => import('./admin/AdminLayout'))
const RequireAdmin = lazy(() => import('./admin/RequireAdmin'))
const Dashboard = lazy(() => import('./admin/pages/Dashboard'))
const VirtualView = lazy(() => import('./admin/pages/VirtualView'))
const ResourcePage = lazy(() => import('./admin/pages/ResourcePage'))
const ContentPage = lazy(() => import('./admin/pages/ContentPage'))
const SettingsPage = lazy(() => import('./admin/pages/SettingsPage'))

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>
      Loading...
    </div>
  )
}

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
      <Suspense fallback={<LoadingScreen />}>
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
      </Suspense>
    </>
  )
}
