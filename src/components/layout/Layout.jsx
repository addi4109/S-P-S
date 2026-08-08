import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

/**
 * Layout — shared page shell. Renders the fixed header (transparent variant
 * over the homepage hero, solid elsewhere), the routed page, and the footer.
 */
export default function Layout() {
  const { pathname } = useLocation()
  const variant = pathname === '/' ? 'home' : 'default'

  return (
    <div>
      <Header variant={variant} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
