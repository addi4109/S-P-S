import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function PrincipalDesk() {
  usePageTitle("Principal's Desk")
  const { t, img } = usePageContent('principalDesk')

  return (
    <section className="bg-[#f8f6f2] py-16 px-6 md:px-20 mt-20 mb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 tracking-wide">
            {t('heroHeading', 'Principal’s Desk')}
          </h1>
          <div className="w-24 h-0.5 bg-gray-700 mx-auto mt-4" />
        </div>
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="flex justify-center">
            <div className="bg-white p-3 shadow-lg">
              <img
                alt={t('principalAlt', 'Principal')}
                className="w-72 h-96 object-cover"
                src={img('principalImage', '/assets/images/principal.jpg')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="text-gray-800">
            <h2 className="text-2xl font-serif mb-6">{t('sectionHeading', 'Message from the Principal')}</h2>
            <p className="leading-relaxed mb-5 text-lg">
              {t('message1', 'Welcome to our institution, a place where tradition meets excellence and education is shaped with values, discipline, and integrity. Our college stands as a pillar of academic distinction, nurturing young minds to become responsible professionals and conscientious citizens.')}
            </p>
            <p className="leading-relaxed mb-5 text-lg">
              {t('message2', 'We believe education is not merely the acquisition of knowledge, but the cultivation of character, leadership, and lifelong learning. Through dedicated faculty, modern infrastructure, and a student-centered approach, we strive to prepare our students for global challenges.')}
            </p>
            <p className="leading-relaxed mb-8 text-lg">
              {t('message3', 'I invite you to be a part of our academic journey and experience an environment that inspires growth, innovation, and excellence.')}
            </p>
            <div className="border-t border-gray-400 pt-6">
              <p className="font-serif text-xl text-gray-900">{t('principalName', 'Mr. A. V. Gaikwad')}</p>
              <p className="text-sm text-gray-600 tracking-wide">
                {t('principalQualification', 'ME (Mechanical)')}
                <br />
                {t('principalTitle', 'Principal')}
              </p>
              <p className="text-sm text-gray-600">{t('principalInstitution', 'Satara Polytechnic Satara')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
