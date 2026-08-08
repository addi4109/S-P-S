import { useResource } from '../../hooks/useResource'
import { staticFallbacks } from '../../data/staticFallbacks'

/**
 * RecruitersMarquee — spacious cards grid marquee for top recruiters logos.
 * Renders full uncropped logos inside clean white card containers.
 */
export default function RecruitersMarquee() {
  const { data } = useResource('recruiters', staticFallbacks.recruiters)
  const logos = (Array.isArray(data) ? data : staticFallbacks.recruiters)
    .map((r) => r.image || r.src || '')
    .filter(Boolean)
  const doubled = [...logos, ...logos]

  return (
    <div className="bg-[#f8fafc] py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Our Top Recruiters</h2>
        <div className="w-16 h-0.5 bg-blue-600 mx-auto mt-3 rounded-full" />
      </div>
      <div className="recruiters-wrap h-36 sm:h-44 md:h-48 w-full flex items-center">
        <div className="flex items-center gap-6 sm:gap-10 animate-[slide-logos_25s_linear_infinite] px-4">
          {doubled.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-center shrink-0 w-44 h-28 sm:w-56 sm:h-36 md:w-64 md:h-40 overflow-hidden"
            >
              <img
                alt="Recruiter Logo"
                className="w-full h-full object-contain"
                src={src}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
