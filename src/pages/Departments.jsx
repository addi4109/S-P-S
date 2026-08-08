import { Link } from 'react-router-dom'
import { useResource } from '../hooks/useResource'
import { departments as staticDepartments } from '../data/departments'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Departments() {
  usePageTitle('Departments')

  // The Departments page shows the six image-bearing branches (General Science has no card).
  const { data } = useResource('departments', staticDepartments)
  const featured = (Array.isArray(data) ? data : staticDepartments).filter((d) => d.image)

  return (
    <>
      <section className="bg-gray-900 mt-24 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Departments</h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto mt-4 rounded-full" />
        <p
          className="text-white mt-5 max-w-2xl mx-auto text-lg leading-relaxed"
          style={{ opacity: 0.8 }}
        >
          Explore our six diploma engineering branches designed to build strong foundations
          for careers in technology and industry.
        </p>
      </section>

      <section className="bg-[#f8f6f2] py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((dept) => (
            <div
              key={dept.slug}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="overflow-hidden">
                  <img
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={dept.cardTitle || ''}
                    src={dept.image}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{dept.cardTitle}</h3>
                  {dept.description && (
                    <p className="text-gray-600 text-sm mt-2.5 leading-relaxed">{dept.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 font-medium">
                    <span>Intake: {dept.intake || 30}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>Direct 2nd Year: {dept.direct2ndYear ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex gap-3 mt-auto">
                <Link
                  to="/admission"
                  className="flex-1 text-center bg-blue-600 px-4 py-2.5 rounded-lg text-white text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Apply Now
                </Link>
                <Link
                  to={`/departments/${dept.slug}`}
                  className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
