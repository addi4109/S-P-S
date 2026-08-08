// Runtime smoke test: server-render every page inside a MemoryRouter to catch
// render-time errors (bad data access, hook misuse, etc.). Not part of the app.
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Layout from './src/components/layout/Layout'
import Home from './src/pages/Home'
import About from './src/pages/About'
import Contact from './src/pages/Contact'
import GoverningBody from './src/pages/GoverningBody'
import PrincipalDesk from './src/pages/PrincipalDesk'
import Departments from './src/pages/Departments'
import DepartmentDetail from './src/pages/DepartmentDetail'
import Gallery from './src/pages/Gallery'
import Placement from './src/pages/Placement'
import Grievance from './src/pages/Grievance'
import Admission from './src/pages/Admission'
import Notice from './src/pages/Notice'
import NotFound from './src/pages/NotFound'
import AdminLogin from './src/pages/AdminLogin'
import AdminLayout from './src/admin/AdminLayout'
import Dashboard from './src/admin/pages/Dashboard'
import VirtualView from './src/admin/pages/VirtualView'
import ResourcePage from './src/admin/pages/ResourcePage'

const routes = [
  ['/', Home],
  ['/about', About],
  ['/contact', Contact],
  ['/governing-body', GoverningBody],
  ['/principal-desk', PrincipalDesk],
  ['/departments', Departments],
  ['/departments/computer', DepartmentDetail],
  ['/departments/general-science', DepartmentDetail],
  ['/departments/bogus', DepartmentDetail],
  ['/gallery', Gallery],
  ['/placement', Placement],
  ['/grievance', Grievance],
  ['/admission', Admission],
  ['/notice', Notice],
  ['/does-not-exist', NotFound],
]

// Admin pages render standalone (no public Layout).
const standalone = [['/admin', AdminLogin]]

// Admin panel pages render inside AdminLayout with a catch-all route so
// useParams works for ResourcePage.
function adminRender(path, element) {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="*" element={element} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

const adminCases = [
  ['/admin/dashboard', <Dashboard />],
  ['/admin/preview', <VirtualView />],
  ['/admin/departments', <ResourcePage />],
  ['/admin/staff', <ResourcePage />],
  ['/admin/bogus', <ResourcePage />],
]

let failures = 0
for (const [path, Page] of routes) {
  try {
    const html = renderToString(
      <MemoryRouter initialEntries={[path]}>
        <Layout>
          <Page />
        </Layout>
      </MemoryRouter>
    )
    console.log(`OK   ${path}  (${html.length} chars)`)
  } catch (e) {
    failures++
    console.log(`FAIL ${path}  -> ${e.message}`)
  }
}
for (const [path, Page] of standalone) {
  try {
    const html = renderToString(
      <MemoryRouter initialEntries={[path]}>
        <Page />
      </MemoryRouter>
    )
    console.log(`OK   ${path}  (${html.length} chars)`)
  } catch (e) {
    failures++
    console.log(`FAIL ${path}  -> ${e.message}`)
  }
}
for (const [path, element] of adminCases) {
  try {
    const html = adminRender(path, element)
    console.log(`OK   ${path}  (${html.length} chars)`)
  } catch (e) {
    failures++
    console.log(`FAIL ${path}  -> ${e.message}`)
  }
}
console.log(failures ? `\n${failures} FAILURE(S)` : '\nAll pages render cleanly')
process.exit(failures ? 1 : 0)
