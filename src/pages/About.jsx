import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function About() {
  usePageTitle('About Us')
  const { t } = usePageContent('about')

  return (
    <div className="bg-[#f4faff] min-h-screen text-gray-800 font-sans">
      {/* ── 1. Full-Width Hero Section ── */}
      <section className="w-full bg-[#0d1527] text-white pt-28 md:pt-36 pb-14 px-6 shadow-xl relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight tracking-tight" style={{ color: '#ffffff' }}>
            {t('heroTitle', 'Over 40+ Years of Educational Excellence')}
          </h1>

          <p className="text-xl md:text-2xl font-serif pt-4" style={{ color: '#ffffff' }}>
            {t('heroSubtitle', 'The Birth of a Legend')}
          </p>
        </div>
      </section>

      {/* ── 2. History Paragraphs (No card, No heading title) ── */}
      <section className="w-full bg-white py-16 px-6 border-b border-blue-100/60">
        <div className="max-w-5xl mx-auto space-y-8 text-base md:text-lg leading-relaxed text-gray-700">
          <p>
            {t(
              'history1',
              'In the early 1980s, establishing non-grant technical education in semi-urban regions like Satara was a formidable challenge. Access to quality professional education was limited, and the philosophy of self-financed institutions was still in its infancy. During this crucial period, with the blessings and guidance of Hon. Shri K. S. Patil (Ex. MLA), the foundation of our institute was laid in 1983 under the aegis of Satara Education Society. The vision was boldly carried forward by pioneering mentors of the Society—Hon. M. L. Wadikar, Late D. S. Kulkarni, Late H. L. Ekbote, and other dedicated educationists—who conceived and implemented progressive and revolutionary ideas to make quality education accessible in the region. Their efforts received strong support from Hon. Shri N. J. Palkar (Ex. Chairman, Satara Education Society, Satara) and were effectively translated into reality under the leadership of Shri G. M. Deshmukh, the first Principal of the institute'
            )}
          </p>
          <p>
            {t(
              'history2',
              'Through perseverance, commitment, and academic discipline, the institute steadily grew in stature and reputation. Today, it stands proudly as one of the leading institutes in the state, known for its academic excellence and strong value system. The entire faculty and staff take immense pride in carrying forward this rich legacy and upholding the vision laid down by our founders.'
            )}
          </p>
        </div>
      </section>

      {/* ── 3. Rest of About Page Content ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-16 space-y-12">
        {/* Motto Section Card */}
        <div className="bg-[#0d1527] text-white border border-blue-900/80 rounded-2xl py-12 px-8 text-center shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-sm md:text-base font-semibold tracking-widest uppercase font-serif" style={{ color: '#fbbf24' }}>
              {t('mottoLabel', 'Institutional Philosophy')}
            </h3>
            <blockquote className="text-3xl md:text-5xl font-serif font-bold tracking-wide italic" style={{ color: '#ffffff' }}>
              {t('quote1', '“Jai Jagat,')}{' '}{t('quote2', 'Jai Bharat.”')}
            </blockquote>
            <p className="font-serif text-base md:text-lg max-w-xl mx-auto leading-relaxed pt-2" style={{ color: '#f1f5f9' }}>
              {t('mottoMeaning', 'Embodying universal harmony and dedicated service to our nation through transformative technical education.')}
            </p>
          </div>
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
              <p className="leading-relaxed text-gray-700 text-base md:text-lg">
                {t('visionText', 'To be a globally acclaimed Institute in Technical Education and Research for holistic socio-economic development.')}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-blue-950 mb-4">
                {t('missionHeading', 'Mission')}
              </h3>
              <ul className="list-disc list-inside space-y-2.5 text-gray-700 text-base md:text-lg">
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
          <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside text-gray-700 text-base md:text-lg">
            <li>{t('highlight1', 'Code of Conduct')}</li>
            <li>{t('highlight2', 'Organisational Chart')}</li>
            <li>{t('highlight3', 'Mandatory Disclosures')}</li>
            <li>{t('highlight4', 'Distinctions')}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
