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
      <footer className="bg-[#0d1527] text-white px-4 sm:px-6 lg:px-12 py-12 font-serif">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-base sm:text-lg font-bold uppercase tracking-wider mb-3">
              {t('followUsLabel', 'FOLLOW US')}
            </h3>
          </div>
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3">
              {t('noticeBoardHeading', 'Notice Board')}
            </h3>
            <p className="text-sm font-semibold text-white mb-1">{t('spsCampusLabel', 'SPS Campus :')}</p>
            <p className="text-sm text-white leading-relaxed mb-4">{t('address', siteConfig.address)}</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3">
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
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3">
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

        <div className="border-t border-white/20 max-w-6xl mx-auto my-8" />

        <div className="max-w-6xl mx-auto text-center space-y-3 text-sm text-white">
          <p>
            <span className="text-white font-semibold">{t('officeTimingsLabel', 'Office Timings:')}</span><br />
            {t('officeTimings', siteConfig.officeTimings)}
          </p>
          <div className="space-y-0.5 pt-1 text-white">
            {tList('phones', siteConfig.phones).map((p) => (
              <p key={p} className="text-white font-medium">{p}</p>
            ))}
          </div>
          <p className="pt-2 text-white">{t('copyright', `All Rights Reserved © SPS, ${siteConfig.copyrightYear}`)}</p>
          <p className="text-xs text-white">
            {t('builtByLabel', 'Built by')}{' '}
            <span className="font-bold text-white">{t('builtBy', siteConfig.builtBy)}</span>
          </p>
        </div>
      </footer>
    </>
  )
}
