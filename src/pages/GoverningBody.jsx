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
      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8 pb-10 text-center group"
    >
      <div className="flex justify-center">
        <img
          alt={m.alt}
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 group-hover:border-indigo-300 transition"
          src={m.photo}
          loading="lazy"
        />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mt-5">{m.name}</h3>
      <p className="text-sm text-indigo-600 font-medium mt-1">{m.designation}</p>
    </div>
  )

  return (
    <section className="py-20 bg-gray-100 mt-40">
      <div className="max-w-7xl mx-auto px-4 space-y-24">
        {sections.map((s) => (
          <div key={s.title}>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900">{s.title}</h2>
              <p className="text-gray-600 mt-2">{s.subtitle}</p>
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
