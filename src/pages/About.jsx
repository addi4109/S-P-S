import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function About() {
  usePageTitle('About Us')
  const { t } = usePageContent('about')

  return (
    <div className="bg-[#f4faff] min-h-screen text-gray-800 font-sans">
      {/* ── 1. Full-Width Hero Section ── */}
      <section className="w-full bg-[#0d1527] text-white pt-28 md:pt-36 pb-20 px-6 shadow-xl relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Jai Jagat, Jai Bharat Theme Motto Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-400/40 bg-amber-500/10 text-amber-300 font-serif text-sm md:text-base tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{t('quoteFull', '“Jai Jagat, Jai Bharat”')}</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
            {t('heroTitle', 'Over 40+ Years of Educational Excellence')}
          </h1>

          <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full" />

          <p className="text-lg md:text-2xl text-slate-200 font-serif max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle', 'The Birth of a Legend — Universal Vision & National Service')}
          </p>
        </div>
      </section>

      {/* ── 2. Main Page Content ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-16 space-y-12">
        {/* History */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100/60 p-8 md:p-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-blue-950">
            {t('historyHeading', 'Our Rich Heritage')}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            {t('history1', 'In the early 1980s, establishing non-grant technical education in semi-urban regions like Satara was a formidable challenge. Access to quality professional education was limited, and the philosophy of self-financed institutions was still in its infancy. During this crucial period, with the blessings and guidance of Hon. Shri K. S. Patil (Ex. MLA), the foundation of our institute was laid in 1983 under the aegis of Satara Education Society. The vision was boldly carried forward by pioneering mentors of the Society—Hon. M. L. Wadikar, Late D. S. Kulkarni, Late H. L. Ekbote, and other dedicated educationists—who conceived and implemented progressive and revolutionary ideas to make quality education accessible in the region. Their efforts received strong support from Hon. Shri N. J. Palkar (Ex. Chairman, Satara Education Society, Satara) and were effectively translated into reality under the leadership of Shri G. M. Deshmukh, the first Principal of the institute')}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            {t('history2', 'Through perseverance, commitment, and academic discipline, the institute steadily grew in stature and reputation. Today, it stands proudly as one of the leading institutes in the state, known for its academic excellence and strong value system. The entire faculty and staff take immense pride in carrying forward this rich legacy and upholding the vision laid down by our founders.')}
          </p>
        </div>

        {/* Motto Section Card */}
        <div className="bg-[#0d1527] text-white border border-blue-900/80 rounded-2xl py-12 px-8 text-center shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-amber-400 text-sm md:text-base font-semibold tracking-widest uppercase font-serif">
              {t('mottoLabel', 'Institutional Philosophy')}
            </h3>
            <blockquote className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide italic">
              {t('quote1', '“Jai Jagat,')}{' '}{t('quote2', 'Jai Bharat.”')}
            </blockquote>
            <p className="text-slate-300 font-serif text-sm md:text-base max-w-xl mx-auto leading-relaxed pt-2">
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
