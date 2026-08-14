import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { departments as staticDepartments } from '../../data/departments'
import { useResource } from '../../hooks/useResource'
import { usePageContent } from '../../hooks/usePageContent'
import { ChevronDownIcon, CloseIcon } from '../ui/Icons'

/**
 * MobileDrawer — Premium off-canvas navigation drawer for mobile devices.
 * Retains original #ebf9ff branding color while elevating layout, backdrop, and interactions.
 */
export default function MobileDrawer({ open, onClose }) {
  const { t, img } = usePageContent('header')
  const [openSection, setOpenSection] = useState(null)

  // Use live departments from DB; fall back to static on first load
  const { data: liveDepts } = useResource('departments', staticDepartments)
  const deptItems = (Array.isArray(liveDepts) ? liveDepts : staticDepartments).map((d) => ({
    label: d.navLabel || d.cardTitle,
    path: `/departments/${d.slug}`,
  }))

  // Lock body scroll while the drawer is open; close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const toggle = (key) =>
    setOpenSection((cur) => (cur === key ? null : key))

  const close = () => {
    setOpenSection(null)
    onClose()
  }

  const aboutItems = [
    { label: t('aboutAbout', 'About SPS'), path: '/about' },
    { label: t('aboutPrincipalDesk', "Principal's Desk"), path: '/principal-desk' },
  ]

  const navItemClass = ({ isActive }) =>
    `flex items-center px-4 py-2.5 rounded-xl font-medium text-[15px] transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20'
        : 'text-gray-800 hover:bg-blue-100/60 hover:text-blue-700'
    }`

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 z-[99] ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className={`lg:hidden fixed top-0 right-0 h-full w-[85vw] max-w-xs bg-[#ebf9ff] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out z-[100] border-l border-white/80 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-200/50 bg-[#ebf9ff]">
          <Link to="/" onClick={close} className="flex items-center gap-3">
            <img
              alt={t('logoAltMobile', 'Logo')}
              className="w-10 h-10 rounded-full border border-gray-300 object-cover shadow-sm"
              src={img('logo', '/assets/images/logo.jpg')}
            />
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-tight">
                {t('collegeShortName', 'Satara Polytechnic')}
              </h3>
              <p className="text-xs text-blue-700 font-medium">Satara</p>
            </div>
          </Link>
          <button
            className="p-2 rounded-full text-gray-600 hover:bg-blue-200/60 hover:text-gray-900 transition-colors"
            aria-label={t('closeMenuLabel', 'Close menu')}
            onClick={close}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="flex flex-col gap-1.5 sps-nav-link">
            <li>
              <NavLink to="/" end className={navItemClass} onClick={close}>
                {t('navHome', 'Home')}
              </NavLink>
            </li>

            {/* About Us Dropdown */}
            <li>
              <button
                onClick={() => toggle('about')}
                className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-medium text-[15px] transition-all duration-200 cursor-pointer ${
                  openSection === 'about'
                    ? 'bg-blue-100/80 text-blue-800 font-semibold'
                    : 'text-gray-800 hover:bg-blue-100/60 hover:text-blue-700'
                }`}
              >
                <span>{t('navAboutUs', 'About Us')}</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openSection === 'about' ? 'rotate-180 text-blue-700' : 'text-gray-500'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSection === 'about' ? 'max-h-40 mt-1' : 'max-h-0'
                }`}
              >
                <ul className="pl-3 ml-4 space-y-1 border-l-2 border-blue-300 py-1">
                  {aboutItems.map((i) => (
                    <li key={i.path}>
                      <Link
                        to={i.path}
                        onClick={close}
                        className="block px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-100/50 rounded-lg transition-colors"
                      >
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <NavLink to="/governing-body" className={navItemClass} onClick={close}>
                {t('navGoverningBody', 'Governing Body')}
              </NavLink>
            </li>

            {/* Departments Dropdown */}
            <li>
              <button
                onClick={() => toggle('departments')}
                className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-medium text-[15px] transition-all duration-200 cursor-pointer ${
                  openSection === 'departments'
                    ? 'bg-blue-100/80 text-blue-800 font-semibold'
                    : 'text-gray-800 hover:bg-blue-100/60 hover:text-blue-700'
                }`}
              >
                <span>{t('navDepartments', 'Departments')}</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openSection === 'departments' ? 'rotate-180 text-blue-700' : 'text-gray-500'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSection === 'departments' ? 'max-h-96 mt-1' : 'max-h-0'
                }`}
              >
                <ul className="pl-3 ml-4 space-y-1 border-l-2 border-blue-300 py-1">
                  {deptItems.map((i) => (
                    <li key={i.path}>
                      <Link
                        to={i.path}
                        onClick={close}
                        className="block px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-100/50 rounded-lg transition-colors"
                      >
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <NavLink to="/gallery" className={navItemClass} onClick={close}>
                {t('navGallery', 'Gallery')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/placement" className={navItemClass} onClick={close}>
                {t('navPlacement', 'Placement')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/notice" className={navItemClass} onClick={close}>
                {t('navNotice', 'Notice')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/grievance" className={navItemClass} onClick={close}>
                {t('navGrievances', 'Grievances')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/admission" className={navItemClass} onClick={close}>
                {t('navAdmission', 'Admission Process')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navItemClass} onClick={close}>
                {t('navContact', 'Contact')}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Footer Quick Action */}
        <div className="p-4 border-t border-blue-200/60 bg-[#ebf9ff]">
          <Link
            to="/admission"
            onClick={close}
            className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition-all duration-200"
          >
            {t('navAdmissionBtn', 'Apply for Admission')}
          </Link>
        </div>
      </aside>
    </>
  )
}
