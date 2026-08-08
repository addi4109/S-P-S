import { departments } from '../../data/departments'

const deptLookup = Object.fromEntries(departments.map((d) => [d.slug, d]))

/**
 * StaffAdminCard — identical card design to the public website's StaffCard:
 * Clean white background, rounded-xl, 4px border-indigo-100 circular avatar,
 * centered typography, and bottom action buttons.
 */
export default function StaffAdminCard({ member, onEdit, onDelete }) {
  const dept = deptLookup[member.department] || {}
  const ring = dept?.ring || 'border-indigo-100'
  const accent = dept?.accent || 'text-indigo-600'
  const emailColor = dept?.emailColor || 'text-blue-600'

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition p-6 text-center h-full flex flex-col justify-between">
      {/* Top Details Wrapper */}
      <div className="flex flex-col items-center">
        {/* Circle Image Avatar */}
        <div className="flex justify-center">
          <img
            alt={member.name || 'Staff member'}
            className={`w-28 h-28 rounded-full object-cover border-4 ${ring}`}
            src={member.image || '/assets/images/placeholder.png'}
            loading="lazy"
          />
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 mt-4">{member.name}</h3>

        {/* Role */}
        <p className={`text-sm ${accent} font-medium mt-1`}>{member.role}</p>

        {/* Qualification & Experience */}
        <div className="mt-4 space-y-1 text-sm text-gray-700">
          {member.qualification && (
            <p>
              <b>Qualification:</b> {member.qualification}
            </p>
          )}
          {member.experience && (
            <p>
              <b>Experience:</b> {member.experience}
            </p>
          )}
        </div>

        {/* Email */}
        {member.email && (
          <div className="mt-4">
            <a href={`mailto:${member.email}`} className={`text-sm ${emailColor} hover:underline break-all`}>
              {member.email}
            </a>
          </div>
        )}
      </div>

      {/* Admin Action Buttons */}
      <div className="flex items-center justify-center gap-3 w-full mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(member)}
          className="flex-1 py-2 px-4 rounded-lg bg-blue-50 text-blue-600 font-semibold text-xs hover:bg-blue-100 transition cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(member)}
          className="flex-1 py-2 px-4 rounded-lg bg-red-50 text-red-600 font-semibold text-xs hover:bg-red-100 transition cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
