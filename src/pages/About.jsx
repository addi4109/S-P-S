import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function About() {
  usePageTitle('About Us')
  const { t } = usePageContent('about')

  return (
    <section className="bg-[#f4faff] min-h-screen pt-24 pb-16 px-4 md:px-12 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Hero */}
        <div className="bg-[#0d1527] text-white rounded-2xl shadow-xl p-10 md:p-16 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            {t('heroTitle', 'Over 40+ Years of Educational Excellence')}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-serif opacity-95">
            {t('heroSubtitle', 'The Birth of a Legend')}
          </p>
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100/60 p-8 md:p-12 space-y-6">
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            {t('history1', 'In the early 1980s, establishing non-grant technical education in semi-urban regions like Satara was a formidable challenge. Access to quality professional education was limited, and the philosophy of self-financed institutions was still in its infancy. During this crucial period, with the blessings and guidance of Hon. Shri K. S. Patil (Ex. MLA), the foundation of our institute was laid in 1983 under the aegis of Satara Education Society. The vision was boldly carried forward by pioneering mentors of the Society—Hon. M. L. Wadikar, Late D. S. Kulkarni, Late H. L. Ekbote, and other dedicated educationists—who conceived and implemented progressive and revolutionary ideas to make quality education accessible in the region. Their efforts received strong support from Hon. Shri N. J. Palkar (Ex. Chairman, Satara Education Society, Satara) and were effectively translated into reality under the leadership of Shri G. M. Deshmukh, the first Principal of the institute')}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            {t('history2', 'Through perseverance, commitment, and academic discipline, the institute steadily grew in stature and reputation. Today, it stands proudly as one of the leading institutes in the state, known for its academic excellence and strong value system. The entire faculty and staff take immense pride in carrying forward this rich legacy and upholding the vision laid down by our founders.')}
          </p>
        </div>

        {/* Quote */}
        <div className="bg-gradient-to-r from-blue-50 via-sky-100 to-blue-50 border border-blue-200/70 rounded-2xl py-12 px-6 text-center shadow-sm">
          <blockquote className="text-2xl md:text-3xl font-serif font-bold text-blue-950 italic max-w-4xl mx-auto">
            {t('quote1', '“Jai Jagat,')}<br />{t('quote2', 'Jai Bharat.”')}
          </blockquote>
        </div>

        {/* SPS intro */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100/60 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-blue-950 mb-4">
            {t('spsHeading', 'SPS, Satara')}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            {t('spsIntro', 'Satara Polytechnic, officially known as Satara Education Society\'s Satara Polytechnic, is a well-established technical institute located in Satara, Maharashtra, India. It has been providing quality technical education in the diploma stream for several decades.')}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100/60 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-serif font-bold text-blue-950 mb-4">
                {t('visionHeading', 'Vision')}
              </h3>
              <p className="leading-relaxed text-gray-700">
                {t('visionText', 'To be a globally acclaimed Institute in Technical Education and Research for holistic socio-economic development.')}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-blue-950 mb-4">
                {t('missionHeading', 'Mission')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{t('mission1', 'Ensure 100% employability and diverse career opportunities')}</li>
                <li>{t('mission2', 'Strengthen curriculum, pedagogy, assessment and faculty')}</li>
                <li>{t('mission3', 'Promote research culture through projects and consultancy')}</li>
                <li>{t('mission4', 'Develop socially responsible citizens')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-8 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-blue-100/60">
            <h4 className="text-4xl md:text-5xl font-serif font-bold text-blue-900">
              {t('stat1Number', '6')}
            </h4>
            <p className="mt-2 text-base md:text-lg font-medium text-gray-700">
              {t('stat1Label', 'Diploma Courses Offered')}
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-blue-100/60">
            <h4 className="text-4xl md:text-5xl font-serif font-bold text-blue-900">
              {t('stat2Number', '200+')}
            </h4>
            <p className="mt-2 text-base md:text-lg font-medium text-gray-700">
              {t('stat2Label', 'Yearly Student Intake')}
            </p>
          </div>
        </div>

        {/* Additional Highlights */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100/60 p-8 md:p-12">
          <h3 className="text-2xl font-serif font-bold text-blue-950 mb-4">
            {t('highlightsHeading', 'Additional Highlights')}
          </h3>
          <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside text-gray-700">
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
