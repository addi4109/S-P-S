import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function About() {
  usePageTitle('About Us')
  const { t } = usePageContent('about')

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
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

      {/* ── 2. History Paragraphs (Full-width clean white background) ── */}
      <section className="w-full bg-white py-16 px-6 border-b border-gray-100">
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

      {/* ── 3. Quote Banner ("Jai Jagat, Jai Bharat.") ── */}
      <section className="w-full bg-[#f4f6f8] py-14 px-6 text-center border-b border-gray-200/80">
        <blockquote className="text-2xl md:text-3xl font-serif font-bold text-gray-900 italic max-w-3xl mx-auto">
          {t('quoteFull', '“Jai Jagat, Jai Bharat.”')}
        </blockquote>
      </section>

      {/* ── 4. SPS, Satara Section ── */}
      <section className="w-full bg-white py-14 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {t('spsHeading', 'SPS, Satara')}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            {t('spsIntro', 'Satara Polytechnic, officially known as Satara Education Society\'s Satara Polytechnic, is a well-established technical institute located in Satara, Maharashtra, India. It has been providing quality technical education in the diploma stream for several decades.')}
          </p>
        </div>
      </section>

      {/* ── 5. Vision & Mission Section (Full-width Dark Navy) ── */}
      <section className="w-full bg-[#0d1527] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: '#ffffff' }}>
              {t('visionHeading', 'Vision')}
            </h3>
            <p className="leading-relaxed text-base md:text-lg" style={{ color: '#f1f5f9' }}>
              {t('visionText', 'To be a globally acclaimed Institute in Technical Education and Research for holistic socio-economic development.')}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: '#ffffff' }}>
              {t('missionHeading', 'Mission')}
            </h3>
            <ul className="list-disc list-inside space-y-2.5 text-base md:text-lg" style={{ color: '#f1f5f9' }}>
              <li>{t('mission1', 'Ensure 100% employability and diverse career opportunities')}</li>
              <li>{t('mission2', 'Strengthen curriculum, pedagogy, assessment and faculty')}</li>
              <li>{t('mission3', 'Promote research culture through projects and consultancy')}</li>
              <li>{t('mission4', 'Develop socially responsible citizens')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Stats & Additional Highlights ── */}
      <section className="w-full bg-[#f8fafc] py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h4 className="text-4xl md:text-5xl font-serif font-bold text-blue-900">
                {t('stat1Number', '6')}
              </h4>
              <p className="mt-2 text-base md:text-lg font-medium text-gray-700">
                {t('stat1Label', 'Diploma Courses Offered')}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
              <h4 className="text-4xl md:text-5xl font-serif font-bold text-blue-900">
                {t('stat2Number', '200+')}
              </h4>
              <p className="mt-2 text-base md:text-lg font-medium text-gray-700">
                {t('stat2Label', 'Yearly Student Intake')}
              </p>
            </div>
          </div>

          {/* Additional Highlights */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
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
      </section>
    </div>
  )
}
