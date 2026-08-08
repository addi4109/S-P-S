import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useResource } from '../hooks/useResource'
import { departments as staticDepartments } from '../data/departments'
import { staticFallbacks } from '../data/staticFallbacks'
import StaffCard from '../components/ui/StaffCard'
import { usePageTitle } from '../hooks/usePageTitle'

export default function DepartmentDetail() {
  const { slug } = useParams()
  const { data: deptData } = useResource('departments', staticDepartments)
  const { data: staffData } = useResource('staff', staticFallbacks.staff)

  const [activeTab, setActiveTab] = useState('department') // 'department' | 'staff'

  // Always reset to 'department' tab whenever switching to any department
  useEffect(() => {
    setActiveTab('department')
  }, [slug])

  const dept = (Array.isArray(deptData) ? deptData : staticDepartments).find(
    (d) => d.slug === slug
  )

  usePageTitle(dept ? dept.pageTitle : 'Department')

  if (!dept) {
    return (
      <section className="min-h-screen bg-[#f4faff] pt-24 px-4 sm:px-6 py-24 text-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Department not found</h1>
        <p className="text-gray-600 mt-3 font-serif">
          The department you are looking for does not exist.
        </p>
        <Link
          to="/departments"
          className="inline-block mt-6 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          View all departments
        </Link>
      </section>
    )
  }

  const staff = (Array.isArray(staffData) ? staffData : []).filter(
    (m) => m.department === slug
  )

  return (
    <section className="min-h-screen bg-[#f4faff] pt-20 pb-16">
      {/* Hero Header Banner */}
      <div className="w-full bg-[#0d1527] text-white py-14 px-6 text-center mb-10 shadow-md">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide">
          {dept.pageTitle || `Department of ${dept.cardTitle}`}
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* ── Left Sidebar (Fixed 240px width) ── */}
          <div className="w-60 sm:w-56 md:w-60 shrink-0">
            <div className="bg-white border border-blue-100/70 rounded-2xl shadow-md overflow-hidden flex flex-col">
              <button
                onClick={() => setActiveTab('department')}
                className={`w-full text-left py-3.5 px-5 font-serif font-semibold text-sm transition cursor-pointer ${
                  activeTab === 'department'
                    ? 'bg-blue-50 text-blue-950 border-l-[4px] border-blue-600 font-bold'
                    : 'text-gray-700 hover:bg-gray-50 border-l-[4px] border-transparent'
                }`}
              >
                Department
              </button>

              <button
                onClick={() => setActiveTab('staff')}
                className={`w-full text-left py-3.5 px-5 font-serif font-semibold text-sm transition cursor-pointer ${
                  activeTab === 'staff'
                    ? 'bg-blue-50 text-blue-950 border-l-[4px] border-blue-600 font-bold'
                    : 'text-gray-700 hover:bg-gray-50 border-l-[4px] border-transparent'
                }`}
              >
                Staff
              </button>
            </div>
          </div>

          {/* ── Main Content Container ── */}
          <div className="flex-1 min-w-0">
            {activeTab === 'department' ? (
              /* TAB 1: Department Overview & Vision/Mission */
              <div className="bg-white border border-blue-100/70 rounded-2xl p-8 shadow-lg space-y-6">
                {/* Title & Underline */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-blue-950">
                    Department of {dept.cardTitle || dept.navLabel || 'Computer Engineering'}
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 mt-3 rounded-full" />
                </div>

                {/* Overview / Description Paragraph */}
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {dept.description ||
                    `The Department of ${dept.cardTitle} focuses on excellence in academics, innovation, and professional ethics to shape future technologists.`}
                </p>

                {/* Vision & Mission Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Vision Card */}
                  <div className="border border-blue-100 rounded-xl p-6 bg-blue-50/40">
                    <h3 className="font-serif font-bold text-blue-950 text-lg mb-2">Vision</h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      {dept.vision ||
                        'To develop competent engineers with integrity and innovation.'}
                    </p>
                  </div>

                  {/* Mission Card */}
                  <div className="border border-blue-100 rounded-xl p-6 bg-blue-50/40">
                    <h3 className="font-serif font-bold text-blue-950 text-lg mb-2">Mission</h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      {dept.mission ||
                        'Quality education aligned with industry and society.'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2: Staff List */
              <div className="bg-white border border-blue-100/70 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-blue-950 mb-2">{dept.pageTitle} Staff</h2>
                <div className="w-16 h-1 bg-blue-600 mt-2 mb-8 rounded-full" />

                {staff.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {staff.map((member) => (
                      <StaffCard key={member.email || member._id} member={member} dept={dept} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 font-serif">
                    No staff members found for this department.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
