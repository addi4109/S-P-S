import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function Placement() {
  usePageTitle('Placement')
  const { t, img } = usePageContent('placement')

  return (
    <section className="bg-[#f4faff] min-h-screen pt-28 pb-16 px-4 md:px-12 text-gray-800">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100/60 p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-blue-950 tracking-wide">
            {t('heroTitle', 'College Placement Cell')}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto my-4 rounded-full" />
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
            {t(
              'heroSubtitle',
              'Cultivating professional excellence through heritage values, strategic industry alliances, and refined career guidance.'
            )}
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100/60 p-8 md:p-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-3">
            {t('introHeading', 'Introduction')}
          </h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            {t(
              'introPara',
              'The Placement Cell stands as a distinguished pillar of the institution, committed to shaping careers with discretion, discipline, and long-term vision. Through enduring industry relationships and structured professional preparation, students are guided toward meaningful and respectable careers under the stewardship of the Principal and Management.'
            )}
          </p>
        </div>

        {/* Functions */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100/60 p-8 md:p-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-4">
            {t('functionsHeading', 'Functions of the Placement Cell')}
          </h2>
          <ul className="space-y-3 text-gray-700 leading-relaxed list-disc list-inside text-base md:text-lg">
            <li>{t('function1', 'Curate and conduct institutional campus recruitment initiatives.')}</li>
            <li>{t('function2', 'Foster long-term associations with reputed industries.')}</li>
            <li>{t('function3', 'Offer refined career counseling and professional mentorship.')}</li>
            <li>{t('function4', 'Deliver aptitude, etiquette, and interview mastery programs.')}</li>
            <li>{t('function5', 'Preserve detailed placement archives and corporate feedback.')}</li>
            <li>{t('function6', 'Encourage internships and structured industrial exposure.')}</li>
            <li>{t('function7', 'Guide students in résumé refinement and career positioning.')}</li>
          </ul>
        </div>

        {/* Composition */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100/60 p-8 md:p-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-6">
            {t('compositionHeading', 'Composition of the Placement Cell')}
          </h2>
          <div className="hidden md:block overflow-x-auto border border-blue-200/60 rounded-xl bg-white">
            <table className="w-full text-sm text-gray-800">
              <thead className="bg-blue-50 text-blue-950 font-serif">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">{t('compCol1', 'Sr. No.')}</th>
                  <th className="px-6 py-4 text-left font-bold">{t('compCol2', 'Name')}</th>
                  <th className="px-6 py-4 text-left font-bold">{t('compCol3', 'Designation')}</th>
                  <th className="px-6 py-4 text-left font-bold">{t('compCol4', 'Position')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                <tr className="hover:bg-blue-50/50 transition-colors duration-200">
                  <td className="px-6 py-4">{t('compRow1Col1', '1')}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{t('compRow1Col2', 'Mr. V.A. Bhosale')}</td>
                  <td className="px-6 py-4">{t('compRow1Col3', 'Lecturer')}</td>
                  <td className="px-6 py-4 font-medium text-blue-700">{t('compRow1Col4', 'Placement Officer')}</td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors duration-200">
                  <td className="px-6 py-4">{t('compRow2Col1', '2')}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{t('compRow2Col2', 'Mr. U.S. Patil')}</td>
                  <td className="px-6 py-4">{t('compRow2Col3', 'HOD–CH')}</td>
                  <td className="px-6 py-4 font-medium text-blue-700">{t('compRow2Col4', 'Advisor')}</td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors duration-200">
                  <td className="px-6 py-4">{t('compRow3Col1', '3')}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{t('compRow3Col2', 'Ms. K.S. Sable')}</td>
                  <td className="px-6 py-4">{t('compRow3Col3', 'HOD – CO')}</td>
                  <td className="px-6 py-4">{t('compRow3Col4', 'Member')}</td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors duration-200">
                  <td className="px-6 py-4">{t('compRow4Col1', '4')}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{t('compRow4Col2', 'Mrs. A.T. Salunkhe')}</td>
                  <td className="px-6 py-4">{t('compRow4Col3', 'HOD – ENTC')}</td>
                  <td className="px-6 py-4">{t('compRow4Col4', 'Member')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-4 space-y-1">
              <p><span className="font-semibold text-gray-900">{t('mobileCol1', 'Sr. No:')}</span> {t('compRow1Col1', '1')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol2', 'Name:')}</span> {t('compRow1Col2', 'Mr. V.A. Bhosale')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol3', 'Designation:')}</span> {t('compRow1Col3', 'Lecturer')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol4', 'Position:')}</span> {t('compRow1Col4', 'Placement Officer')}</p>
            </div>
            <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-4 space-y-1">
              <p><span className="font-semibold text-gray-900">{t('mobileCol1', 'Sr. No:')}</span> {t('compRow2Col1', '2')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol2', 'Name:')}</span> {t('compRow2Col2', 'Mr. U.S. Patil')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol3', 'Designation:')}</span> {t('compRow2Col3', 'HOD–CH')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol4', 'Position:')}</span> {t('compRow2Col4', 'Advisor')}</p>
            </div>
            <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-4 space-y-1">
              <p><span className="font-semibold text-gray-900">{t('mobileCol1', 'Sr. No:')}</span> {t('compRow3Col1', '3')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol2', 'Name:')}</span> {t('compRow3Col2', 'Ms. K.S. Sable')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol3', 'Designation:')}</span> {t('compRow3Col3', 'HOD – CO')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol4', 'Position:')}</span> {t('compRow3Col4', 'Member')}</p>
            </div>
            <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-4 space-y-1">
              <p><span className="font-semibold text-gray-900">{t('mobileCol1', 'Sr. No:')}</span> {t('compRow4Col1', '4')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol2', 'Name:')}</span> {t('compRow4Col2', 'Mrs. A.T. Salunkhe')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol3', 'Designation:')}</span> {t('compRow4Col3', 'HOD – ENTC')}</p>
              <p><span className="font-semibold text-gray-900">{t('mobileCol4', 'Position:')}</span> {t('compRow4Col4', 'Member')}</p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100/60 p-8 md:p-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 mb-3">
            {t('supportHeading', 'Student Placement Support')}
          </h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            {t(
              'supportPara1',
              'Every student of Satara Polytechnic, Satara is entitled to discreet, professional placement guidance through the Placement Cell. Active participation in training programs and placement initiatives is strongly encouraged.'
            )}
          </p>
          <p className="text-gray-700 mt-3 leading-relaxed text-base md:text-lg">
            {t(
              'supportPara2',
              'Students may approach the Placement Officer via the college office for career consultations and placement-related matters.'
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
