import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function Admission() {
  usePageTitle('Admission Process')
  const { t, img, tList } = usePageContent('admission')

  return (
    <section className="w-full bg-gray-50 py-16 px-4 mt-20 md:mt-28">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('heroTitle', 'Diploma Admission 2025-26')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('heroSubtitle', 'Admission for First Year Post-SSC Diploma Courses in Engineering and Technology for Academic Year 2025-26.')}
          </p>
        </div>

        {/* Important documents */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {t('docsHeading', 'Important Documents Required For Admission')}
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              {t('doc1', 'Indian Nationality Certificate / School leaving / Birth Certificate on which Nationality is mentioned')}
            </li>
            <li>
              {t('doc2', 'Mark sheet of S.S.C. (Std. X)')}
            </li>
            <li>
              {t('doc3', 'Latest School/ College leaving certificate after passing SSC (Standard X)')}
            </li>
            <li>
              {t('doc4', 'ITI / HSC / HSC Vocational mark sheet and Leaving Certificate, if applicable')}
            </li>
            <li>
              {t('doc5', 'Certificate of passing Intermediate Grade Drawing examination, if applicable')}
            </li>
            <li>
              {t('doc6', 'Caste / Non Creamy layer/ Income Certificate as per your Category')}
            </li>
            <li>
              {t('doc7', 'Relevant documents indicating candidature type')}
            </li>
            <li>
              {t('doc8', 'For Persons with Physical Disability: Certificate from proper authority like civil surgeon')}
            </li>
            <li>
              {t('doc9', 'For Sons and Daughters of Defense Personnel: Relevant Documents from competent authority')}
            </li>
          </ul>
        </div>

        {/* Eligibility conditions */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {t('eligibilityHeading', 'Eligibility Conditions')}
          </h2>
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">
              {t('eligibilitySub1', 'First Year of Post SSC:')}
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                {t('eligibility1', 'Candidate should be an Indian National')}
              </li>
              <li>
                {t('eligibility2', 'Passed 10th Std./ SSC examination or its equivalent with at least 35% aggregate marks')}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">
              {t('eligibilitySub2', 'Direct Second Year of Post SSC:')}
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                {t('eligibility3', 'Candidate should be an Indian National')}
              </li>
              <li>
                {t('eligibility4', 'Passed 10+2 with Physics and Chemistry as compulsory subjects along with Mathematics/Biology')}
              </li>
              <li>
                {t('eligibility5', 'OR 10+2 Science (with Mathematics as one of the Subjects)')}
              </li>
              <li>
                {t('eligibility6', 'OR 10+2 Science with Technical')}
              </li>
              <li>
                {t('eligibility7', 'OR 10+2 with Vocational')}
              </li>
              <li>
                {t('eligibility8', 'OR 10th + (2 years ITI) with appropriate Trade')}
              </li>
            </ul>
          </div>
        </div>

        {/* Coordinator contact */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {t('coordinatorHeading', 'Admission Coordinator')}
          </h2>
          <p className="text-gray-700">
            {t('coordinatorNameLabel', 'Name:')}
            <span className="font-medium">
              {t('coordinatorName', 'Mrs. Pawar S S (FC Coordinator)')}
            </span>
            <br />
            {t('coordinatorContactLabel', 'Contact Number:')}
            <span className="font-medium">
              {t('coordinatorPhone', '9881726261')}
            </span>
          </p>
        </div>

        {/* FAQ's */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {t('faqHeading', 'FAQ\'s')}
          </h2>
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">
              {t('faq1q', 'Q: I have applied for Non Creamy Layer certificate and have the receipt of the application. Shall I get the benefit of caste?')}
            </h3>
            <p className="text-gray-700">
              {t('faq1a', 'A: No. The receipt is not accepted. If you have filled the Form as Category, then it shall convert to OPEN as NCL is not submitted and Candidate has to pay difference fee.')}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">
              {t('faq2q', 'Q: Which document is required to get benefits of TFWS?')}
            </h3>
            <p className="text-gray-700">
              {t('faq2a', 'A: Valid Income Certificate of Parents having Annual Income up to 8 Lacs.')}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">
              {t('faq3q', 'Q: Where to apply for admission?')}
            </h3>
            <p className="text-gray-700">
              {t('faq3a', 'A:')}
              <a href="https://poly25users.dtemaharashtra.gov.in/diploma25/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                {t('dteLink', 'Click here')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
