import { useEffect, useRef } from 'react'

/**
 * useReveal — scroll-reveal behaviour ported from js/pages/home-reveal.js.
 * Applies to any element that should start invisible (opacity: 0) and fade in
 * the first time it enters the viewport. Respects prefers-reduced-motion.
 *
 * @param {number} threshold IntersectionObserver threshold (0–1)
 * @returns {React.RefObject} attach to the element you want to reveal
 */
export function useReveal(threshold = 0.08) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // No observer / reduced motion -> show immediately.
    if (reduced || !('IntersectionObserver' in window)) {
      el.style.opacity = 1
      return
    }

    el.style.transition = 'opacity 700ms ease'

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1
            io.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}
