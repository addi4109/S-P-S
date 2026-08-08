import { siteConfig } from '../../data/siteConfig'
import { usePageContent } from '../../hooks/usePageContent'

/**
 * LocationSection — college intro + address/hours + embedded Google Map.
 */
export default function LocationSection() {
  const { t, img } = usePageContent('home')
  return (
    <div className="flex flex-col lg:flex-row justify-around items-start mt-16 lg:mt-28 px-4 sm:px-6 lg:px-12 gap-8 lg:gap-12">
      <div className="text-left mt-4 lg:mt-12 w-full lg:w-1/2 max-w-full lg:max-w-xl">
        <h2 className="text-2xl sm:text-3xl font-bold">{t('locationHeading', 'Satara Polytechnic Satara')}</h2>
        <p className="text-gray-500 mt-1 text-sm">{t('locationSociety', siteConfig.society)}</p>
        <p className="text-gray-500 mt-4 text-sm leading-relaxed">
          {t('locationIntro', 'With a legacy of over 40 years, SPS, Satara is one of the best Diploma engineering colleges in Satara, with a meritorious track record in academics, placements, and holistic growth, making it a veritable Cradle of Achievers.')}
        </p>
        <div className="mt-6 space-y-3">
          <div>
            <p className="text-gray-900 font-semibold text-sm">{t('locationLabel', 'Location')}</p>
            <p className="text-gray-500 text-sm mt-1">{t('locationAddress', siteConfig.address)}</p>
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-sm">{t('locationHoursLabel', 'Office Hours')}</p>
            <p className="text-gray-500 text-sm mt-1">{t('locationHours', '11 AM – 5 PM')}</p>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 shadow-sm w-full lg:w-1/2 h-48 sm:h-60 md:h-80 lg:h-96 overflow-hidden rounded-lg">
        <iframe
          src={img('mapEmbed', siteConfig.mapEmbedUrl)}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t('mapTitle', 'Satara Polytechnic Satara location')}
        />
      </div>
    </div>
  )
}
