/**
 * StaffCard — a department staff member card. The accent ring/role/email
 * colours come from the department (`dept.ring`, `dept.accent`, `dept.emailColor`).
 */
export default function StaffCard({ member, dept }) {
  const ring = dept?.ring || 'border-indigo-100'
  const accent = dept?.accent || 'text-indigo-600'
  const emailColor = dept?.emailColor || 'text-blue-600'

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition p-6 text-center">
      <div className="flex justify-center">
        <img
          alt={member.name}
          className={`w-28 h-28 rounded-full object-cover border-4 ${ring}`}
          src={member.image}
          loading="lazy"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mt-4">{member.name}</h3>
      <p className={`text-sm ${accent} font-medium mt-1`}>{member.role}</p>
      <div className="mt-4 space-y-1 text-sm text-gray-700">
        <p>
          <b>Qualification:</b> {member.qualification}
        </p>
        <p>
          <b>Experience:</b> {member.experience}
        </p>
      </div>
      <div className="mt-4">
        <a href={`mailto:${member.email}`} className={`text-sm ${emailColor} hover:underline`}>
          {member.email}
        </a>
      </div>
    </div>
  )
}
