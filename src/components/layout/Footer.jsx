import { Link } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'
import { usePageContent } from '../../hooks/usePageContent'

export default function Footer() {
  const { t, img, tList } = usePageContent('footer')

  return (
    <>
      <div className="w-full bg-white">
        <img
          className="w-full mt-16 h-60 object-cover"
          alt={t('sataraImageAlt', 'Satara')}
          src={img('sataraImage', '/assets/images/satara.png')}
          loading="lazy"
        />
      </div>
      <footer className="bg-gray-900 text-gray-300 px-4 sm:px-6 lg:px-12 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h2 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              {t('experienceHeading', 'EXPERIENCE MORE.')}
            </h2>
            <p className="text-sm sm:text-base mb-2 sm:mb-4">{t('followUsLabel', 'FOLLOW US')}</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm sm:text-base mb-2 sm:mb-3">
              {t('noticeBoardHeading', 'Notice Board')}
            </h3>
            <p className="text-sm sm:text-base font-semibold">{t('spsCampusLabel', 'SPS Campus :')}</p>
            <p className="text-sm sm:text-base mb-2 sm:mb-4">{t('address', siteConfig.address)}</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm sm:text-base mb-2 sm:mb-3">
              {t('quickLinksHeading', 'Quick Links')}
            </h3>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>
                <Link className="hover:text-white" to="/about">
                  {t('quickAbout', 'About')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/departments">
                  {t('quickDepartments', 'Departments')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/admission">
                  {t('quickAdmissions', 'Admissions')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/placement">
                  {t('quickPlacements', 'Placements')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm sm:text-base mb-2 sm:mb-3">
              {t('moreInfoHeading', 'More Info')}
            </h3>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>
                <Link className="hover:text-white" to="/admin">
                  {t('moreAdminLogin', 'Admin Login')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/contact">
                  {t('moreContactUs', 'Contact Us')}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/grievance">
                  {t('moreGrievancesCell', 'Grievances Cell')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 my-6 sm:my-8" />
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-4 sm:gap-0">
          <div className="text-center sm:text-left">
            <p>{t('officeTimingsLabel', 'Office Timings:')}</p>
            <p>{t('officeTimings', siteConfig.officeTimings)}</p>
          </div>
          <div className="text-center">
            {tList('phones', siteConfig.phones).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="text-center sm:text-right">
            <p>{t('copyright', `All Rights Reserved © SPS, ${siteConfig.copyrightYear}`)}</p>
            <br />
            <p>
              {t('builtByLabel', 'Built by')} <span className="font-medium text-[#f2f2f2]">{t('builtBy', siteConfig.builtBy)}</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
