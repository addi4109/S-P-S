import { useResource } from '../../hooks/useResource'
import { departments as staticDepartments } from '../../data/departments'
import DeptCard from '../ui/DeptCard'
import Reveal from '../ui/Reveal'

/**
 * DepartmentsSection — the homepage department cards (data-driven with the
 * static departments as fallback). Image-bearing branches only.
 */
export default function DepartmentsSection() {
  const { data } = useResource('departments', staticDepartments)
  const featured = (Array.isArray(data) ? data : staticDepartments).filter((d) => d.image)

  return (
    <div id="departments">
      <Reveal>
        <div className="max-w-7xl mx-auto py-14 px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Departments</h2>
            <div className="w-16 h-0.5 bg-blue-600 mx-auto mt-3 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {featured.map((dept) => (
              <Reveal key={dept.slug} className="w-full max-w-sm">
                <DeptCard dept={dept} />
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
