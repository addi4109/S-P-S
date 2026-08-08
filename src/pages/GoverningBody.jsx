import { useResource } from '../hooks/useResource'
import { governingBodyMembers as staticMembers } from '../data/governingBody'
import { usePageTitle } from '../hooks/usePageTitle'

const sections = [
  { title: 'Governing Body', subtitle: 'Visionary leaders guiding our institution' },
  { title: 'Local Government Body', subtitle: 'Community representatives and local authorities' },
]

export default function GoverningBody() {
  usePageTitle('Governing Body')

  const { data } = useResource('governingBody', staticMembers)
  const members = Array.isArray(data) ? data : staticMembers

  const renderMember = (m) => (
    <div
      key={m.name}
      className="bg-white border border-blue-100/70 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 pb-8 text-center group"
    >
      <div className="flex justify-center">
        <img
          alt={m.alt}
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 group-hover:border-blue-300 transition"
          src={m.photo}
          loading="lazy"
        />
      </div>
      <h3 className="text-base font-serif font-bold text-gray-900 mt-4">{m.name}</h3>
      <p className="text-sm text-blue-700 font-medium mt-1">{m.designation}</p>
    </div>
  )

  return (
    <section className="bg-[#f4faff] min-h-screen pt-20 pb-16">
      {/* Hero Header Banner */}
      <div className="w-full bg-[#0d1527] text-white py-14 px-6 text-center mb-12 shadow-md">
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-wide">
          Governing Body
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
        <p className="text-slate-300 font-serif mt-3 text-base md:text-lg">
          Visionary leaders and administration guiding Satara Polytechnic
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {sections.map((s) => (
          <div key={s.title}>
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-blue-950">{s.title}</h2>
              <p className="text-gray-600 font-serif mt-1">{s.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.filter((m) => m.section === s.title).map(renderMember)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
