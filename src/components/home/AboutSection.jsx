import { Link } from 'react-router-dom'
import { usePageContent } from '../../hooks/usePageContent'

/**
 * AboutSection — "The Cradle of Achievers" intro block under the ticker.
 */
export default function AboutSection() {
  const { t, img } = usePageContent('home')
  return (
    <div className="flex w-full max-[720px]:flex-col">
      <div className="w-1/2 max-[720px]:w-full flex items-center justify-center py-8 px-6">
        <img
          alt={t('aboutImageAlt', 'College')}
          className="object-cover max-w-full rounded-lg"
          src={img('aboutImage', '/assets/images/college.png')}
          loading="lazy"
        />
      </div>
      <div className="w-1/2 max-[720px]:w-full flex flex-col justify-center py-8 px-6 lg:px-10">
        <h2 className="text-3xl font-bold max-[720px]:text-2xl max-[720px]:mt-2">
          {t('aboutHeading', 'The Cradle of Achievers')}
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          {t('aboutIntro', 'In the early 1980s, establishing non-grant technical education in semi-urban regions like Satara was a formidable challenge. Access to quality professional education was limited, and the philosophy of self-financed institutions was still in its infancy. During this crucial period, with the blessings and guidance of Hon. Shri K. S. Patil (Ex. MLA), the foundation of our institute was laid in 1983 under the aegis of Satara Education Society.')}
        </p>
        <Link
          to="/about"
          className="w-fit mt-6 mb-6 px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          {t('aboutReadMore', 'Read More →')}
        </Link>
      </div>
    </div>
  )
}
