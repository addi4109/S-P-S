import { useEffect, useState } from 'react'
import { useResource } from '../../hooks/useResource'
import { heroSlides as staticSlides } from '../../data/heroSlides'

/**
 * HeroSlider — full-width campus photo crossfader. The slide list comes from
 * MongoDB (hero resource) with the static slides as fallback; the visible
 * slide fades to the next every 2 seconds.
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
    const id = setInterval(() => setActive((cur) => (cur + 1) % total), 2000)
    return () => clearInterval(id)
  }, [total])

  if (!total) return null

  return (
    <div
      id="hero-slider"
      className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden bg-gray-900"
    >
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="SPS Campus"
          className={`hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            i === active % total ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}
