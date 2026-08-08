import { useState } from 'react'
import { useResource } from '../hooks/useResource'
import { usePageTitle } from '../hooks/usePageTitle'

const FALLBACK = [
  {
    title: 'Fee Structure',
    fileUrl: 'https://ik.imagekit.io/Sps/24ba66eb-7426-44fe-bb3b-e59806ac4e3e-Fee_Structure_ZzdxhNKbw.pdf',
    uploadedAt: '2026-08-05T11:16:03.821Z',
  },
]

function fmtDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
}

/** Resolves notice file URLs so Cloudinary & external PDFs open 100% reliably. */
function resolveNoticeUrl(fileUrl) {
  if (!fileUrl) return ''
  let url = fileUrl.trim()

  // Handle legacy Cloudinary PDFs uploaded under /image/upload/
  if (url.includes('cloudinary.com') && url.includes('/image/upload/') && url.toLowerCase().endsWith('.pdf')) {
    return url.replace('/image/upload/', '/image/upload/f_jpg/')
  }

  return url
}

export default function Notice() {
  usePageTitle('Notice Board')
  const { data, loading } = useResource('notices', FALLBACK)
  const notices = Array.isArray(data) && data.length > 0 ? data : FALLBACK
  const [selectedNotice, setSelectedNotice] = useState(null)

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 mt-24 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 fade-up">Notice Board</h1>
        <p className="text-xl text-white fade-up fade-up-d1" style={{ opacity: 0.9 }}>
          Official notices, circulars and announcements from Satara Polytechnic Satara.
        </p>
      </section>

      {/* Notices */}
      <section
        className="px-4 sm:px-6 lg:px-12 py-12 min-h-[50vh]"
        style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Loader */}
          {loading && !notices.length && (
            <div className="text-center py-20 text-gray-500 font-medium">
              Loading latest notices…
            </div>
          )}

          {/* Notice Cards */}
          {notices.length > 0 && (
            <div id="notice-grid" className="notice-grid">
              {notices.map((notice, idx) => {
                const title = notice?.title || 'Untitled Notice'
                const rawUrl = notice?.fileUrl || ''
                const targetUrl = resolveNoticeUrl(rawUrl)
                const date = fmtDate(notice?.uploadedAt || notice?.createdAt)

                return (
                  <div key={notice._id || idx} className="notice-card fade-up" style={{ animationDelay: `${idx * 0.08}s` }}>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="icon-badge">
                        <svg width="20" height="20" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937', lineHeight: 1.4 }}>
                          {title}
                        </h3>
                        {date && (
                          <p style={{ fontSize: '.8rem', color: '#9ca3af', marginTop: '.25rem' }}>{date}</p>
                        )}
                      </div>
                    </div>

                    {targetUrl && (
                      <div className="flex gap-2.5 mt-auto">
                        <button
                          onClick={() => setSelectedNotice({ title, date, targetUrl, rawUrl })}
                          className="btn-cta text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                          View Document
                        </button>
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                          Open ↗
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Document Viewer Modal ── */}
      {selectedNotice && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-[#f8fafc]">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{selectedNotice.title}</h3>
                {selectedNotice.date && (
                  <p className="text-xs text-gray-500 mt-0.5">{selectedNotice.date}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={selectedNotice.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition"
                >
                  Open Original ↗
                </a>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold text-sm flex items-center justify-center transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Viewer Body */}
            <div className="flex-1 bg-gray-100 overflow-auto p-4 flex items-center justify-center min-h-[60vh]">
              {selectedNotice.targetUrl.endsWith('.pdf') && !selectedNotice.targetUrl.includes('f_jpg') ? (
                <iframe
                  src={selectedNotice.targetUrl}
                  title={selectedNotice.title}
                  className="w-full h-[65vh] border-0 rounded-xl bg-white shadow-sm"
                />
              ) : (
                <img
                  src={selectedNotice.targetUrl}
                  alt={selectedNotice.title}
                  className="max-h-[65vh] max-w-full object-contain rounded-xl shadow-md border bg-white"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
