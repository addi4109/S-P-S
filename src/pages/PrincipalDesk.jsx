import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function PrincipalDesk() {
  usePageTitle("Principal's Desk")
  const { t, img } = usePageContent('principalDesk')

  return (
    <section className="bg-[#f7f5f0] min-h-screen pt-24 md:pt-28 pb-12 text-gray-800 font-serif flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full">
        {/* Title & Underline */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-wide">
            {t('heroHeading', 'Principal’s Desk')}
          </h1>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto mt-2.5" />
        </div>

        {/* Content Section: 2 Columns */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Image */}
          <div className="md:col-span-5 flex justify-center">
            <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
              <img
                alt={t('principalAlt', 'Principal')}
                className="w-full max-w-[320px] md:max-w-none h-[340px] md:h-[390px] object-cover rounded-xs"
                src={img('principalImage', '/assets/images/principal.jpg')}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Message */}
          <div className="md:col-span-7 space-y-3.5 text-gray-700 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl md:text-2xl font-serif text-gray-900 mb-2">
              {t('sectionHeading', 'Message from the Principal')}
            </h2>

            <p>
              {t(
                'message1',
                'Welcome to our institution, a place where tradition meets excellence and education is shaped with values, discipline, and integrity. Our college stands as a pillar of academic distinction, nurturing young minds to become responsible professionals and conscientious citizens.'
              )}
            </p>

            <p>
              {t(
                'message2',
                'We believe education is not merely the acquisition of knowledge, but the cultivation of character, leadership, and lifelong learning. Through dedicated faculty, modern infrastructure, and a student-centered approach, we strive to prepare our students for global challenges.'
              )}
            </p>

            <p>
              {t(
                'message3',
                'I invite you to be a part of our academic journey and experience an environment that inspires growth, innovation, and excellence.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
