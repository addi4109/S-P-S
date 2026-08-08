import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { departments } from '../../data/departments'
import { usePageContent } from '../../hooks/usePageContent'
import { CloseIcon } from '../ui/Icons'

const deptItems = departments.map((d) => ({
  label: d.navLabel,
  path: `/departments/${d.slug}`,
}))

/**
 * MobileDrawer — off-canvas navigation drawer (port of js/utilities/mobile-nav.js).
 * `open` slides the panel in; submenus ("About Us" / "Departments") collapse.
 */
export default function MobileDrawer({ open, onClose }) {
  const { t } = usePageContent('header')
  const [openSection, setOpenSection] = useState(null)

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

  return (
    <div
      className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#ebf9ff] shadow-lg overflow-y-auto transform transition-transform duration-300 z-[100] ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-hidden={!open}
    >
      <div className="flex justify-end px-4 py-4">
        <button className="text-3xl p-2" aria-label={t('closeMenuLabel', 'Close menu')} onClick={close}>
          <CloseIcon />
        </button>
      </div>
      <ul className="flex flex-col mt-4 gap-4 px-6 text-lg text-black sps-nav-link">
        <li>
          <NavLink to="/" end onClick={close}>
            {t('navHome', 'Home')}
          </NavLink>
        </li>
        <li>
          <button onClick={() => toggle('about')} className="cursor-pointer font-semibold">
            {t('navAboutUs', 'About Us')}
          </button>
          <ul className={`ml-4 mt-2 flex flex-col gap-2 ${openSection === 'about' ? '' : 'hidden'}`}>
            {aboutItems.map((i) => (
              <li key={i.path}>
                <Link to={i.path} onClick={close}>
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <NavLink to="/governing-body" onClick={close}>
            {t('navGoverningBody', 'Governing Body')}
          </NavLink>
        </li>
        <li>
          <button onClick={() => toggle('departments')} className="cursor-pointer font-semibold">
            {t('navDepartments', 'Departments')}
          </button>
          <ul
            className={`ml-4 mt-2 flex flex-col gap-2 ${
              openSection === 'departments' ? '' : 'hidden'
            }`}
          >
            {deptItems.map((i) => (
              <li key={i.path}>
                <Link to={i.path} onClick={close}>
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <NavLink to="/gallery" onClick={close}>
            {t('navGallery', 'Gallery')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/placement" onClick={close}>
            {t('navPlacement', 'Placement')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/notice" onClick={close}>
            {t('navNotice', 'Notice')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/grievance" onClick={close}>
            {t('navGrievances', 'Grievances')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/admission" onClick={close}>
            {t('navAdmission', 'Admission Process')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={close}>
            {t('navContact', 'Contact')}
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
