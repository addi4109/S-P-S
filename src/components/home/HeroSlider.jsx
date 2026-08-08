import { useEffect, useState } from 'react'
import { useResource } from '../../hooks/useResource'
import { heroSlides as staticSlides } from '../../data/heroSlides'

/**
 * HeroSlider — full-width campus photo crossfader.
 * Features smooth fade-in and fade-out animations with interactive slide indicators.
 */
export default function HeroSlider() {
  const { data } = useResource('hero', staticSlides)

  const slides = Array.isArray(data)
    ? data
        .filter((s) => s.active !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((s) => s.image)
    : []

  const [active, setActive] = useState(0)
  const total = slides.length

  useEffect(() => {
    if (!total) return
    const id = setInterval(() => setActive((cur) => (cur + 1) % total), 3500)
    return () => clearInterval(id)
  }, [total])

  if (!total) return null

  return (
    <div
      id="hero-slider"
      className="relative w-full h-[45vh] min-h-[260px] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] overflow-hidden bg-gray-950 select-none group"
    >
      {slides.map((src, i) => {
        const isActive = i === active % total
        return (
          <div
            key={src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            <img
              src={src}
              alt="SPS Campus"
              className={`w-full h-full object-cover object-center transform transition-transform duration-[4000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Subtle gradient overlay to enhance text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </div>
        )
      })}

      {/* Slide Indicator Dots */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === active % total
                  ? 'w-7 bg-white shadow-sm'
                  : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
