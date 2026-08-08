import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function Placement() {
  usePageTitle('Placement')
  const { t, img, tList } = usePageContent('placement')

  return (
    <>
      <div className="bg-neutral-100 py-16 px-4 md:px-16 mt-20 md:mt-28">
        <div className="max-w-6xl mx-auto bg-[#fbfaf8] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-8 md:p-16">
          <div className="text-center mb-14 fade-section show">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-wide text-[#3b0f1e]">
              {t('heroTitle', 'College Placement Cell')}
            </h1>
            <div className="w-28 h-[1.5px] bg-[#c2a36c] mx-auto my-5" />
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg">
              {t(
                'heroSubtitle',
                'Cultivating professional excellence through heritage values, strategic industry alliances, and refined career guidance.'
              )}
            </p>
          </div>

          <section className="fade-section mb-14 bg-white shadow-lg rounded-2xl p-8 show">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5b1f2e] mb-4">{t('introHeading', 'Introduction')}</h2>
            <p className="text-gray-800 leading-loose text-[17px]">
              {t(
                'introPara',
                'The Placement Cell stands as a distinguished pillar of the institution, committed to shaping careers with discretion, discipline, and long-term vision. Through enduring industry relationships and structured professional preparation, students are guided toward meaningful and respectable careers under the stewardship of the Principal and Management.'
              )}
            </p>
          </section>

          <section className="fade-section mb-16 bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5b1f2e] mb-6">
              {t('functionsHeading', 'Functions of the Placement Cell')}
            </h2>
            <ul className="space-y-4 text-gray-800 leading-relaxed list-disc list-inside text-[16.5px]">
              <li>{t('function1', 'Curate and conduct institutional campus recruitment initiatives.')}</li>
              <li>{t('function2', 'Foster long-term associations with reputed industries.')}</li>
              <li>{t('function3', 'Offer refined career counseling and professional mentorship.')}</li>
              <li>{t('function4', 'Deliver aptitude, etiquette, and interview mastery programs.')}</li>
              <li>{t('function5', 'Preserve detailed placement archives and corporate feedback.')}</li>
              <li>{t('function6', 'Encourage internships and structured industrial exposure.')}</li>
              <li>{t('function7', 'Guide students in résumé refinement and career positioning.')}</li>
            </ul>
          </section>

          <section className="fade-section mb-16 bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5b1f2e] mb-6">
              {t('compositionHeading', 'Composition of the Placement Cell')}
            </h2>
            <div className="hidden md:block overflow-x-auto border border-[#e6dcc8] rounded-lg bg-white">
              <table className="w-full text-sm text-gray-800">
                <thead className="bg-[#f3efe7] text-[#3b0f1e]">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">{t('compCol1', 'Sr. No.')}</th>
                    <th className="px-6 py-4 text-left font-medium">{t('compCol2', 'Name')}</th>
                    <th className="px-6 py-4 text-left font-medium">{t('compCol3', 'Designation')}</th>
                    <th className="px-6 py-4 text-left font-medium">{t('compCol4', 'Position')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eee6d6]">
                  <tr className="hover:bg-[#faf7f2] transition-colors duration-300">
                    <td className="px-6 py-4">{t('compRow1Col1', '1')}</td>
                    <td className="px-6 py-4 font-medium">{t('compRow1Col2', 'Mr. V.A. Bhosale')}</td>
                    <td className="px-6 py-4">{t('compRow1Col3', 'Lecturer')}</td>
                    <td className="px-6 py-4">{t('compRow1Col4', 'Placement Officer')}</td>
                  </tr>
                  <tr className="hover:bg-[#faf7f2] transition-colors duration-300">
                    <td className="px-6 py-4">{t('compRow2Col1', '2')}</td>
                    <td className="px-6 py-4 font-medium">{t('compRow2Col2', 'Mr. U.S. Patil')}</td>
                    <td className="px-6 py-4">{t('compRow2Col3', 'HOD–CH')}</td>
                    <td className="px-6 py-4">{t('compRow2Col4', 'Advisor')}</td>
                  </tr>
                  <tr className="hover:bg-[#faf7f2] transition-colors duration-300">
                    <td className="px-6 py-4">{t('compRow3Col1', '3')}</td>
                    <td className="px-6 py-4 font-medium">{t('compRow3Col2', 'Ms. K.S. Sable')}</td>
                    <td className="px-6 py-4">{t('compRow3Col3', 'HOD – CO')}</td>
                    <td className="px-6 py-4">{t('compRow3Col4', 'Member')}</td>
                  </tr>
                  <tr className="hover:bg-[#faf7f2] transition-colors duration-300">
                    <td className="px-6 py-4">{t('compRow4Col1', '4')}</td>
                    <td className="px-6 py-4 font-medium">{t('compRow4Col2', 'Mrs. A.T. Salunkhe')}</td>
                    <td className="px-6 py-4">{t('compRow4Col3', 'HOD – ENTC')}</td>
                    <td className="px-6 py-4">{t('compRow4Col4', 'Member')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-5 max-w-md mx-auto">
              <div className="fade-section bg-[#fdfaf7] border border-[#e6dcc8] rounded-xl p-5 shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                <p>
                  <span className="font-medium">{t('mobileCol1', 'Sr. No:')}</span> {t('compRow1Col1', '1')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol2', 'Name:')}</span> {t('compRow1Col2', 'Mr. V.A. Bhosale')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol3', 'Designation:')}</span> {t('compRow1Col3', 'Lecturer')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol4', 'Position:')}</span> {t('compRow1Col4', 'Placement Officer')}
                </p>
              </div>
              <div className="fade-section bg-[#fdfaf7] border border-[#e6dcc8] rounded-xl p-5 shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                <p>
                  <span className="font-medium">{t('mobileCol1', 'Sr. No:')}</span> {t('compRow2Col1', '2')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol2', 'Name:')}</span> {t('compRow2Col2', 'Mr. U.S. Patil')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol3', 'Designation:')}</span> {t('compRow2Col3', 'HOD–CH')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol4', 'Position:')}</span> {t('compRow2Col4', 'Advisor')}
                </p>
              </div>
              <div className="fade-section bg-[#fdfaf7] border border-[#e6dcc8] rounded-xl p-5 shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                <p>
                  <span className="font-medium">{t('mobileCol1', 'Sr. No:')}</span> {t('compRow3Col1', '3')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol2', 'Name:')}</span> {t('compRow3Col2', 'Ms. K.S. Sable')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol3', 'Designation:')}</span> {t('compRow3Col3', 'HOD – CO')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol4', 'Position:')}</span> {t('compRow3Col4', 'Member')}
                </p>
              </div>
              <div className="fade-section bg-[#fdfaf7] border border-[#e6dcc8] rounded-xl p-5 shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                <p>
                  <span className="font-medium">{t('mobileCol1', 'Sr. No:')}</span> {t('compRow4Col1', '4')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol2', 'Name:')}</span> {t('compRow4Col2', 'Mrs. A.T. Salunkhe')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol3', 'Designation:')}</span> {t('compRow4Col3', 'HOD – ENTC')}
                </p>
                <p>
                  <span className="font-medium">{t('mobileCol4', 'Position:')}</span> {t('compRow4Col4', 'Member')}
                </p>
              </div>
            </div>
          </section>

          <section className="fade-section bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5b1f2e] mb-4">
              {t('supportHeading', 'Student Placement Support')}
            </h2>
            <p className="text-gray-800 leading-loose text-[17px]">
              {t(
                'supportPara1',
                'Every student of Satara Polytechnic, Satara is entitled to discreet, professional placement guidance through the Placement Cell. Active participation in training programs and placement initiatives is strongly encouraged.'
              )}
            </p>
            <p className="text-gray-800 mt-4 leading-loose text-[17px]">
              {t(
                'supportPara2',
                'Students may approach the Placement Officer via the college office for career consultations and placement-related matters.'
              )}
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
