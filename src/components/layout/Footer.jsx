import { Link } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'
import { usePageContent } from '../../hooks/usePageContent'

export default function Footer() {
  const { t, img, tList } = usePageContent('footer')

  return (
    <>
      <div className="w-full bg-white">
        <img
          className="w-full mt-12 h-52 object-cover"
          alt={t('sataraImageAlt', 'Satara')}
          src={img('sataraImage', '/assets/images/satara.png')}
          loading="lazy"
        />
      </div>
      <footer className="bg-[#0b1220] text-white px-6 lg:px-16 py-14 font-serif">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Column 1 */}
          <div>
            <h2 className="text-white text-base md:text-lg font-bold tracking-wide mb-2 uppercase">
              {t('experienceHeading', 'EXPERIENCE MORE.')}
            </h2>
            <p className="text-white text-sm font-semibold tracking-wider">
              {t('followUsLabel', 'FOLLOW US')}
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-bold text-base md:text-lg mb-3">
              {t('noticeBoardHeading', 'Notice Board')}
            </h3>
            <p className="text-sm font-semibold text-white mb-1">
              {t('spsCampusLabel', 'SPS Campus :')}
            </p>
            <p className="text-sm text-white leading-relaxed">
              {t('address', siteConfig.address)}
            </p>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-bold text-base md:text-lg mb-3">
              {t('quickLinksHeading', 'Quick Links')}
            </h3>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link className="text-white hover:underline transition-all" to="/about">
                  {t('quickAbout', 'About')}
                </Link>
              </li>
              <li>
                <Link className="text-white hover:underline transition-all" to="/departments">
                  {t('quickDepartments', 'Departments')}
                </Link>
              </li>
              <li>
                <Link className="text-white hover:underline transition-all" to="/admission">
                  {t('quickAdmissions', 'Admissions')}
                </Link>
              </li>
              <li>
                <Link className="text-white hover:underline transition-all" to="/placement">
                  {t('quickPlacements', 'Placements')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white font-bold text-base md:text-lg mb-3">
              {t('moreInfoHeading', 'More Info')}
            </h3>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <Link className="text-white hover:underline transition-all" to="/admin">
                  {t('moreAdminLogin', 'Admin Login')}
                </Link>
              </li>
              <li>
                <Link className="text-white hover:underline transition-all" to="/contact">
                  {t('moreContactUs', 'Contact Us')}
                </Link>
              </li>
              <li>
                <Link className="text-white hover:underline transition-all" to="/grievance">
                  {t('moreGrievancesCell', 'Grievances Cell')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 max-w-7xl mx-auto my-10" />

        {/* Bottom Bar: 3 columns flex-row justify-between on desktop */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-white gap-6 md:gap-0">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="font-semibold text-white mb-0.5">{t('officeTimingsLabel', 'Office Timings:')}</p>
            <p className="text-white">{t('officeTimings', siteConfig.officeTimings)}</p>
          </div>

          {/* Middle */}
          <div className="text-center text-white">
            {tList('phones', siteConfig.phones).map((p) => (
              <p key={p} className="font-medium text-white">{p}</p>
            ))}
          </div>

          {/* Right */}
          <div className="text-center md:text-right space-y-1 text-white">
            <p className="text-white">{t('copyright', `All Rights Reserved © SPS, ${siteConfig.copyrightYear}`)}</p>
            <p className="text-xs text-white">
              {t('builtByLabel', 'Built by')}{' '}
              <span className="font-bold text-white">{t('builtBy', siteConfig.builtBy)}</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
