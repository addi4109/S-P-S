import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function Grievance() {
  usePageTitle('Grievance Cell')
  const { t, img, tList } = usePageContent('grievance')

  return (
    <section className="w-full bg-[#f4faff] min-h-screen pt-20 pb-16 text-gray-800">
      {/* Hero Header Banner */}
      <div className="w-full bg-[#0d1527] text-white py-14 px-6 text-center mb-10 shadow-md">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
          {t('heroTitle', 'College Grievance Redressal Cell')}
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
        <p className="mt-4 text-base md:text-lg font-serif text-slate-300 max-w-3xl mx-auto">
          {t('heroSubtitle', 'Ensuring a secure and harmonious environment for all Staff and Students.')}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-8">

          <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('introHeading', 'Introduction')}</h2>
            <p className="text-gray-700 mb-3">
              {t('introText1', 'The grievances received by the Principal are forwarded to the concerned Committee members.')}
            </p>
            <p className="text-gray-700">
              {t('introText2', 'Staff can mail their grievances at')}{' '}
              <span className="text-indigo-600 font-medium">{t('grievanceEmail', 'spscomputer2026@gmail.com')}</span>.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('functionsHeading', 'Functions of the Grievance Redressal Committee')}</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t('function1', 'Accept written grievances from students and staff related to the system.')}</li>
              <li>{t('function2', 'Create and implement a mechanism to handle the reported grievances.')}</li>
              <li>{t('function3', 'Forward the findings to the Management if necessary for further action.')}</li>
              <li>
                {t('function4', 'Listen, record and scrutinize the grievances submitted by the Staff and Students and take necessary steps immediately.')}
              </li>
              <li>{t('function5', 'Attend to the grievances based on authenticity and gravity of the criticisms made.')}</li>
              <li>
                {t('function6', 'Represent the grievances to the concerned section which may include maintenance, transport, academic, amenities etc.')}
              </li>
              <li>{t('function7', 'Convene periodical meetings to discuss whether the grievances have been settled.')}</li>
              <li>{t('function8', 'Follow-up of these matters at regular intervals till their final disposal.')}</li>
              <li>{t('function9', 'Maintain strict confidentiality, if necessary.')}</li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6">{t('tableHeading', 'Composition of College Grievance Redressal Cell')}</h2>
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-150 w-full bg-white border border-gray-200 rounded-xl text-sm sm:text-base">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="text-left py-2 px-4">{t('colNo', 'Sr. No.')}</th>
                    <th className="text-left py-2 px-4">{t('colName', 'Name')}</th>
                    <th className="text-left py-2 px-4">{t('colDesignation', 'Designation')}</th>
                    <th className="text-left py-2 px-4">{t('colPosition', 'Position')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{t('row1No', '1')}</td>
                    <td className="py-2 px-4 font-medium text-gray-800">{t('row1Name', 'Mr. R.S Jagtap')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row1Designation', 'Committee Head')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row1Position', 'Student Counseling Commitee')}</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{t('row2No', '2')}</td>
                    <td className="py-2 px-4 font-medium text-gray-800">{t('row2Name', 'Ms. K.S Sabale')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row2Designation', 'Committee Head')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row2Position', 'Women Grievance Cell')}</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{t('row3No', '3')}</td>
                    <td className="py-2 px-4 font-medium text-gray-800">{t('row3Name', 'Mr. U.S Patil')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row3Designation', 'Committee Head')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row3Position', 'Internal Quality Assurance')}</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{t('row4No', '4')}</td>
                    <td className="py-2 px-4 font-medium text-gray-800">{t('row4Name', 'Mrs. A.T Salunkhe')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row4Designation', 'Committee Head')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row4Position', 'Health Care Commitee')}</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{t('row5No', '5')}</td>
                    <td className="py-2 px-4 font-medium text-gray-800">{t('row5Name', 'Mr. V.A Bhosale')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row5Designation', 'Committee Head')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row5Position', 'Student Grievance Cell')}</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{t('row6No', '6')}</td>
                    <td className="py-2 px-4 font-medium text-gray-800">{t('row6Name', 'Mr. A.V Gaikwad')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row6Designation', 'Committee Head.')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row6Position', 'Anti Ragging Commitee')}</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{t('row7No', '7')}</td>
                    <td className="py-2 px-4 font-medium text-gray-800">{t('row7Name', 'Mrs. S.S Pawar')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row7Designation', 'Committee Head')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row7Position', 'Internal Complaint Commitee')}</td>
                  </tr>
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{t('row8No', '8')}</td>
                    <td className="py-2 px-4 font-medium text-gray-800">{t('row8Name', 'Mrs. T.S Bagwan')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row8Designation', 'Committee Head')}</td>
                    <td className="py-2 px-4 text-gray-700">{t('row8Position', 'Student Mentoring Cell')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              <div className="bg-indigo-50 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colNo', 'Sr. No.')}</span>
                  <span>{t('row1No', '1')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colName', 'Name')}</span>
                  <span>{t('row1Name', 'Mr. R.S Jagtap')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colDesignation', 'Designation')}</span>
                  <span>{t('row1Designation', 'Committee Head')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colPosition', 'Position')}</span>
                  <span>{t('row1Position', 'Student Counseling Commitee')}</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colNo', 'Sr. No.')}</span>
                  <span>{t('row2No', '2')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colName', 'Name')}</span>
                  <span>{t('row2Name', 'Ms. K.S Sabale')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colDesignation', 'Designation')}</span>
                  <span>{t('row2Designation', 'Committee Head')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colPosition', 'Position')}</span>
                  <span>{t('row2Position', 'Women Grievance Cell')}</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colNo', 'Sr. No.')}</span>
                  <span>{t('row3No', '3')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colName', 'Name')}</span>
                  <span>{t('row3Name', 'Mr. U.S Patil')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colDesignation', 'Designation')}</span>
                  <span>{t('row3Designation', 'Committee Head')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colPosition', 'Position')}</span>
                  <span>{t('row3Position', 'Internal Quality Assurance')}</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colNo', 'Sr. No.')}</span>
                  <span>{t('row4No', '4')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colName', 'Name')}</span>
                  <span>{t('row4Name', 'Mrs. A.T Salunkhe')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colDesignation', 'Designation')}</span>
                  <span>{t('row4Designation', 'Committee Head')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colPosition', 'Position')}</span>
                  <span>{t('row4Position', 'Health Care Commitee')}</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colNo', 'Sr. No.')}</span>
                  <span>{t('row5No', '5')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colName', 'Name')}</span>
                  <span>{t('row5Name', 'Mr. V.A Bhosale')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colDesignation', 'Designation')}</span>
                  <span>{t('row5Designation', 'Committee Head')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colPosition', 'Position')}</span>
                  <span>{t('row5Position', 'Student Grievance Cell')}</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colNo', 'Sr. No.')}</span>
                  <span>{t('row6No', '6')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colName', 'Name')}</span>
                  <span>{t('row6Name', 'Mr. A.V Gaikwad')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colDesignation', 'Designation')}</span>
                  <span>{t('row6Designation', 'Committee Head.')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colPosition', 'Position')}</span>
                  <span>{t('row6Position', 'Anti Ragging Commitee')}</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colNo', 'Sr. No.')}</span>
                  <span>{t('row7No', '7')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colName', 'Name')}</span>
                  <span>{t('row7Name', 'Mrs. S.S Pawar')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colDesignation', 'Designation')}</span>
                  <span>{t('row7Designation', 'Committee Head')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colPosition', 'Position')}</span>
                  <span>{t('row7Position', 'Internal Complaint Commitee')}</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colNo', 'Sr. No.')}</span>
                  <span>{t('row8No', '8')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colName', 'Name')}</span>
                  <span>{t('row8Name', 'Mrs. T.S Bagwan')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colDesignation', 'Designation')}</span>
                  <span>{t('row8Designation', 'Committee Head')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{t('colPosition', 'Position')}</span>
                  <span>{t('row8Position', 'Student Mentoring Cell')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('studentHeading', 'Student Grievances')}</h2>
            <p className="text-gray-700">
              {t('studentText', 'All students enrolled at Satara Polytechnic Satara have the right to appeal any academic matter in which they feel unfairly treated.')}
            </p>
          </div>
      </div>
    </section>
  )
}
