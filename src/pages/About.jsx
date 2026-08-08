import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function About() {
  usePageTitle('About Us')
  const { t } = usePageContent('about')

  return (
    <section className="bg-white mt-24 text-gray-800">
      {/* Hero */}
      <div className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('heroTitle', 'Over 40+ Years of Educational Excellence')}</h1>
        <p className="text-xl opacity-90">{t('heroSubtitle', 'The Birth of a Legend')}</p>
      </div>

      {/* History */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-8">
        <p className="text-lg leading-relaxed">{t('history1', 'In the early 1980s, establishing non-grant technical education in semi-urban regions like Satara was a formidable challenge. Access to quality professional education was limited, and the philosophy of self-financed institutions was still in its infancy. During this crucial period, with the blessings and guidance of Hon. Shri K. S. Patil (Ex. MLA), the foundation of our institute was laid in 1983 under the aegis of Satara Education Society. The vision was boldly carried forward by pioneering mentors of the Society—Hon. M. L. Wadikar, Late D. S. Kulkarni, Late H. L. Ekbote, and other dedicated educationists—who conceived and implemented progressive and revolutionary ideas to make quality education accessible in the region. Their efforts received strong support from Hon. Shri N. J. Palkar (Ex. Chairman, Satara Education Society, Satara) and were effectively translated into reality under the leadership of Shri G. M. Deshmukh, the first Principal of the institute')}</p>
        <p className="text-lg leading-relaxed">{t('history2', 'Through perseverance, commitment, and academic discipline, the institute steadily grew in stature and reputation. Today, it stands proudly as one of the leading institutes in the state, known for its academic excellence and strong value system. The entire faculty and staff take immense pride in carrying forward this rich legacy and upholding the vision laid down by our founders.')}</p>
      </div>

      {/* Quote */}
      <div className="bg-gray-100 py-16 text-center px-6">
        <blockquote className="text-2xl md:text-3xl font-semibold italic max-w-4xl mx-auto">{t('quote1', '“Jai Jagat,')}<br />{t('quote2', 'Jai Bharat.”')}</blockquote>
      </div>

      {/* SPS intro */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">{t('spsHeading', 'SPS, Satara')}</h2>
        <p className="text-lg leading-relaxed">{t('spsIntro', 'Satara Polytechnic, officially known as Satara Education Society\'s Satara Polytechnic, is a well-established technical institute located in Satara, Maharashtra, India. It has been providing quality technical education in the diploma stream for several decades.')}</p>
      </div>

      {/* Vision & Mission */}
      <div className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">{t('visionHeading', 'Vision')}</h3>
            <p className="leading-relaxed">{t('visionText', 'To be a globally acclaimed Institute in Technical Education and Research for holistic socio-economic development.')}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">{t('missionHeading', 'Mission')}</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>{t('mission1', 'Ensure 100% employability and diverse career opportunities')}</li>
              <li>{t('mission2', 'Strengthen curriculum, pedagogy, assessment and faculty')}</li>
              <li>{t('mission3', 'Promote research culture through projects and consultancy')}</li>
              <li>{t('mission4', 'Develop socially responsible citizens')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 text-center">
        <div className="bg-gray-100 p-10 rounded-xl">
          <h4 className="text-5xl font-bold text-gray-900">{t('stat1Number', '6')}</h4>
          <p className="mt-2 text-lg">{t('stat1Label', 'Diploma Courses Offered')}</p>
        </div>
        <div className="bg-gray-100 p-10 rounded-xl">
          <h4 className="text-5xl font-bold text-gray-900">{t('stat2Number', '200+')}</h4>
          <p className="mt-2 text-lg">{t('stat2Label', 'Yearly Student Intake')}</p>
        </div>
      </div>

      {/* Additional Highlights */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">{t('highlightsHeading', 'Additional Highlights')}</h3>
          <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside">
            <li>{t('highlight1', 'Code of Conduct')}</li>
            <li>{t('highlight2', 'Organisational Chart')}</li>
            <li>{t('highlight3', 'Mandatory Disclosures')}</li>
            <li>{t('highlight4', 'Distinctions')}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
