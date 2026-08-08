import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function PrincipalDesk() {
  usePageTitle("Principal's Desk")
  const { t, img } = usePageContent('principalDesk')

  return (
    <section className="bg-[#f4faff] min-h-screen pt-20 pb-16 text-gray-800">
      {/* Hero Header Banner */}
      <div className="w-full bg-[#0d1527] text-white py-14 px-6 text-center mb-10 shadow-md">
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-wide">
          {t('heroHeading', 'Principal’s Desk')}
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100/60 p-8 md:p-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <div className="bg-white p-3 shadow-md rounded-2xl border border-blue-100">
                <img
                  alt={t('principalAlt', 'Principal')}
                  className="w-72 h-96 object-cover rounded-xl"
                  src={img('principalImage', '/assets/images/principal.jpg')}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-gray-800">
              <h2 className="text-2xl font-serif font-bold text-blue-950 mb-4">
                {t('sectionHeading', 'Message from the Principal')}
              </h2>
              <p className="leading-relaxed mb-4 text-base md:text-lg text-gray-700">
                {t('message1', 'Welcome to our institution, a place where tradition meets excellence and education is shaped with values, discipline, and integrity. Our college stands as a pillar of academic distinction, nurturing young minds to become responsible professionals and conscientious citizens.')}
              </p>
              <p className="leading-relaxed mb-4 text-base md:text-lg text-gray-700">
                {t('message2', 'We believe education is not merely the acquisition of knowledge, but the cultivation of character, leadership, and lifelong learning. Through dedicated faculty, modern infrastructure, and a student-centered approach, we strive to prepare our students for global challenges.')}
              </p>
              <p className="leading-relaxed mb-6 text-base md:text-lg text-gray-700">
                {t('message3', 'I invite you to be a part of our academic journey and experience an environment that inspires growth, innovation, and excellence.')}
              </p>
              <div className="border-t border-blue-200/80 pt-6">
                <p className="font-serif font-bold text-xl text-blue-950">
                  {t('principalName', 'Mr. A. V. Gaikwad')}
                </p>
                <p className="text-sm font-medium text-gray-600 tracking-wide mt-1">
                  {t('principalQualification', 'ME (Mechanical)')}
                  <br />
                  {t('principalTitle', 'Principal')}
                </p>
                <p className="text-sm text-gray-500">{t('principalInstitution', 'Satara Polytechnic Satara')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
