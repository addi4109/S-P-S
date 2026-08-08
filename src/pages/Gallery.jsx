import { useMemo, useState } from 'react'
import { useResource } from '../hooks/useResource'
import { galleryPhotos as staticPhotos } from '../data/galleryPhotos'
import Lightbox from '../components/ui/Lightbox'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Gallery() {
  usePageTitle('Campus Gallery')
  const { data } = useResource('gallery', staticPhotos)
  const photos = Array.isArray(data) ? data : staticPhotos

  // Sort years in descending order (latest first e.g. 2026, 2025, 2022)
  const galleryYears = useMemo(
    () =>
      [...new Set(photos.map((p) => String(p.year)).filter(Boolean))].sort(
        (a, b) => Number(b) - Number(a)
      ),
    [photos]
  )

  const [year, setYear] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Sort photos latest year first
  const visible = useMemo(() => {
    const list = year === 'all' ? photos : photos.filter((p) => String(p.year) === year)
    return [...list].sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0))
  }, [year, photos])

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0d1527] pt-28 pb-14 px-6 text-center text-white shadow-md">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">Campus Gallery</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
        <p className="text-slate-300 font-serif mt-4 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          Moments that define our vibrant community — cultural celebrations, alumni reunions,
          service camps and everything in between.
        </p>

        {/* Advanced Brown Theme Year Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setYear('all')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 ${
              year === 'all'
                ? 'bg-[#78350f] text-white border border-[#b45309] shadow-md shadow-amber-900/20'
                : 'bg-white text-[#78350f] border border-[#fde68a] hover:bg-[#fef3c7] hover:border-[#f59e0b] shadow-sm'
            }`}
          >
            <span>All</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
                year === 'all' ? 'bg-[#92400e] text-amber-100' : 'bg-[#fef3c7] text-[#78350f]'
              }`}
            >
              {photos.length}
            </span>
          </button>

          {galleryYears.map((y) => {
            const count = photos.filter((p) => p.year === y).length
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 ${
                  year === y
                    ? 'bg-[#78350f] text-white border border-[#b45309] shadow-md shadow-amber-900/20'
                    : 'bg-white text-[#78350f] border border-[#fde68a] hover:bg-[#fef3c7] hover:border-[#f59e0b] shadow-sm'
                }`}
              >
                <span>{y}</span>
                {count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
                      year === y ? 'bg-[#92400e] text-amber-100' : 'bg-[#fef3c7] text-[#78350f]'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="bg-[#fdfcf9] px-4 sm:px-6 lg:px-12 py-12">
        <div className="gallery-grid max-w-7xl mx-auto">
          {visible.map((photo, i) => (
            <div
              key={photo.src}
              className="gallery-tile"
              tabIndex="0"
              role="button"
              aria-label="Open photo"
              data-year={photo.year}
              onClick={() => setLightboxIndex(i)}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
            >
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <div className="gallery-overlay">
                <span className="year-badge">{photo.year}</span>
                <span>{photo.caption.split('—')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Lightbox
        photos={visible}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  )
}
