import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { departments as staticDepartments } from '../../data/departments'
import { useResource } from '../../hooks/useResource'
import { usePageContent } from '../../hooks/usePageContent'
import { MenuIcon } from '../ui/Icons'
import MobileDrawer from './MobileDrawer'

/** Shared classes for nav links/spans, coloured per header variant. */
function navItemClass(variant, isActive = false, scrolled = false) {
  const isTransparent = variant === 'home' && !scrolled
  const border = isTransparent ? 'border-white/80' : 'border-gray-300'
  const color = isTransparent
    ? 'text-white'
    : (isActive ? 'text-blue-600 font-semibold' : 'text-gray-900')
  return `sps-nav-link border-x px-2.5 transition hover:opacity-90 font-medium text-[16px] tracking-normal ${border} ${color}`
}

function Dropdown({ variant, item, scrolled }) {
  return (
    <li className="relative group before:absolute before:top-full before:left-0 before:w-full before:h-4 before:content-['']">
      <span className={`${navItemClass(variant, false, scrolled)} cursor-pointer`}>{item.label}</span>
      <ul className="absolute left-0 mt-2 w-72 rounded-2xl bg-white shadow-lg border p-1.5 opacity-0 pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
        {item.dropdown.map((sub) => (
          <li key={sub.path} className="px-4 py-2 hover:bg-gray-100 rounded-lg">
            <Link className="sps-nav-link block whitespace-nowrap hover:text-blue-600 font-medium text-[15px]" to={sub.path}>
              {sub.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

function DesktopNav({ variant, items, scrolled }) {
  return (
    <ul className="hidden lg:flex flex-wrap items-center gap-7 text-[16px] font-medium ml-auto sps-nav-link">
      {items.map((item) =>
        item.dropdown ? (
          <Dropdown key={item.label} variant={variant} item={item} scrolled={scrolled} />
        ) : (
          <li key={item.label}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => navItemClass(variant, isActive, scrolled)}
            >
              {item.label}
            </NavLink>
          </li>
        )
      )}
    </ul>
  )
}

export default function Header({ variant = 'default' }) {
  const { t, img } = usePageContent('header')
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  // Use live departments from DB; fall back to static on first load
  const { data: liveDepts } = useResource('departments', staticDepartments)
  const deptItems = (Array.isArray(liveDepts) ? liveDepts : staticDepartments).map((d) => ({
    label: d.navLabel || d.cardTitle,
    path: `/departments/${d.slug}`,
  }))

  const aboutItems = [
    { label: t('aboutAbout', 'About SPS'), path: '/about' },
    { label: t('aboutPrincipalDesk', "Principal's Desk"), path: '/principal-desk' },
  ]

  const navItems = [
    { label: t('navHome', 'Home'), path: '/' },
    { label: t('navAboutUs', 'About Us'), dropdown: aboutItems },
    { label: t('navGoverningBody', 'Governing Body'), path: '/governing-body' },
    { label: t('navDepartments', 'Departments'), dropdown: deptItems },
    { label: t('navGallery', 'Gallery'), path: '/gallery' },
    { label: t('navPlacement', 'Placement'), path: '/placement' },
    { label: t('navNotice', 'Notice'), path: '/notice' },
    { label: t('navGrievances', 'Grievances'), path: '/grievance' },
    { label: t('navAdmission', 'Admission Process'), path: '/admission' },
    { label: t('navContact', 'Contact'), path: '/contact' },
  ]

  // Home header turns solid once the page is scrolled past 80px.
  useEffect(() => {
    if (variant !== 'home') return
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  if (variant === 'home') {
    return (
      <>
        <header
          id="home-header"
          className={`fixed top-0 z-50 flex w-full px-4 min-[380px]:px-6 py-3.5 gap-6 min-[380px]:gap-10 transition-all duration-300 ${
            scrolled ? 'scrolled bg-[#ebf9ff]/95 shadow-md backdrop-blur-md' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center gap-3 px-2 min-[380px]:px-6 py-2 rounded-bl-full">
            <img
              alt={t('logoAlt', 'Satara Logo')}
              className={`w-10 h-10 min-[380px]:w-14 min-[380px]:h-14 rounded-full object-cover border transition-colors duration-300 ${
                scrolled ? 'border-gray-300' : 'border-white/60'
              }`}
              src={img('logo', '/assets/images/logo.jpg')}
            />
            <h3 className={`font-medium transition-colors duration-300 text-[15px] min-[380px]:text-lg ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>
              {t('collegeName', 'Satara Polytechnic Satara, Satara')}
            </h3>
          </div>
          <DesktopNav variant="home" items={navItems} scrolled={scrolled} />
          <div className="lg:hidden ml-auto">
            <button
              className={`text-3xl transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}
              aria-label={t('openMenuLabel', 'Open menu')}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </header>
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </>
    )
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-[#ebf9ff] shadow-lg">
        <div className="hidden lg:flex w-full px-6 py-4 gap-10">
          <Link to="/" className="flex items-center gap-4 px-6 py-2 rounded-bl-full">
            <img
              alt={t('logoAlt', 'Satara Logo')}
              className="w-15 h-15 rounded-full object-cover border border-gray-300"
              src={img('logo', '/assets/images/logo.jpg')}
            />
            <h3 className="text-lg font-medium text-black">
              {t('collegeName', 'Satara Polytechnic Satara, Satara')}
            </h3>
          </Link>
          <DesktopNav variant="default" items={navItems} />
        </div>
        <div className="lg:hidden flex justify-between items-center px-6 py-4">
          <Link to="/" className="flex items-center gap-4">
            <img
              alt={t('logoAltMobile', 'Logo')}
              className="w-12 h-12 rounded-full border border-gray-300 object-cover"
              src={img('logo', '/assets/images/logo.jpg')}
            />
            <h3 className="text-base font-medium text-black">{t('collegeShortName', 'Satara Polytechnic')}</h3>
          </Link>
          <button
            className="text-3xl p-2"
            aria-label={t('openMenuLabel', 'Open menu')}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
