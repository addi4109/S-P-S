import { useEffect, useRef } from 'react'

/**
 * Lightbox — ultra-modern full-screen photo viewer for the gallery.
 * Features:
 * - Backdrop blur overlay
 * - Fixed prominent top-right close button (✕)
 * - Keyboard navigation (Left, Right, Escape)
 * - Side arrow navigation buttons
 * - Image counter badge & year indicator
 * - Captions bar
 */
export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const closeRef = useRef(null)
  const open = index !== null && index !== undefined && photos.length > 0
  const current = open ? photos[index] : null

  // Keyboard controls: Escape to close, Left/Right for navigation
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open, index, photos])

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open || !current) return null

  const go = (dir) => {
    onNavigate((index + dir + photos.length) % photos.length)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-lg flex items-center justify-center select-none animate-fadeIn"
      onClick={onClose}
    >
      {/* ── Top Left: Counter & Badge ── */}
      <div
        className="absolute top-6 left-6 z-50 flex items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="bg-slate-900/80 border border-white/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{index + 1} of {photos.length}</span>
        </span>

        {current.year && (
          <span className="bg-amber-800 text-amber-50 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            {current.year}
          </span>
        )}
      </div>

      {/* ── Top Right: Prominent Close Button (✕) ── */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-lg flex items-center justify-center border border-white/25 backdrop-blur-md shadow-2xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
      >
        ✕
      </button>

      {/* ── Previous Button (Left Arrow) ── */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            go(-1)
          }}
          aria-label="Previous photo"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white text-3xl font-light flex items-center justify-center border border-white/25 backdrop-blur-md shadow-2xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
        >
          ‹
        </button>
      )}

      {/* ── Image & Caption Container ── */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full px-4 sm:px-12 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-2xl border border-gray-300 shadow-2xl bg-white/60 backdrop-blur-sm max-h-[75vh] flex items-center justify-center p-2">
          <img
            src={current.src}
            alt={current.caption || 'Campus photo'}
            className="max-h-[72vh] max-w-full w-auto h-auto object-contain rounded-xl transition-all duration-300"
          />
        </div>

        {/* Caption Bar */}
        {current.caption && (
          <div className="mt-4 max-w-2xl text-center bg-slate-900/90 border border-white/15 backdrop-blur-md px-6 py-3 rounded-xl shadow-xl">
            <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
              {current.caption}
            </p>
          </div>
        )}
      </div>

      {/* ── Next Button (Right Arrow) ── */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            go(1)
          }}
          aria-label="Next photo"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white text-3xl font-light flex items-center justify-center border border-white/25 backdrop-blur-md shadow-2xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
        >
          ›
        </button>
      )}
    </div>
  )
}
