import { usePageTitle } from '../hooks/usePageTitle'
import { usePageContent } from '../hooks/usePageContent'

export default function PrincipalDesk() {
  usePageTitle("Principal's Desk")
  const { t, img } = usePageContent('principalDesk')

  return (
    <section className="bg-[#f7f5f0] min-h-screen pt-36 md:pt-44 pb-20 text-gray-800 font-serif">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Title & Underline with generous top padding */}
        <div className="text-center mb-16 pt-4">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 tracking-wide">
            {t('heroHeading', 'Principal’s Desk')}
          </h1>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto mt-3" />
        </div>

        {/* Content Section: 2 Columns stretching to equal height */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-stretch">
          {/* Left Column: Image stretched to equal content height */}
          <div className="md:col-span-5 flex flex-col justify-center">
            <div className="w-full h-full bg-white p-2 border border-gray-200 shadow-sm rounded-sm flex flex-col">
              <img
                alt={t('principalAlt', 'Principal')}
                className="w-full h-full min-h-[440px] md:min-h-[520px] object-cover"
                src={img('principalImage', '/assets/images/principal.jpg')}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Message */}
          <div className="md:col-span-7 space-y-6 text-gray-700 leading-relaxed text-base md:text-lg flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-2">
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
