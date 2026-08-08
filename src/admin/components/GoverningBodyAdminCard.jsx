/**
 * GoverningBodyAdminCard — clean admin card for governing body member.
 */
export default function GoverningBodyAdminCard({ member, onEdit, onDelete }) {
  return (
    <div className="admin-staff-card">
      {/* Photo */}
      <div className="admin-staff-photo-wrap">
        <img
          alt={member.alt || member.name || ''}
          className="admin-staff-photo"
          style={{ width: 88, height: 88, borderColor: '#e2e8f0' }}
          src={member.photo}
          loading="lazy"
        />
      </div>

      {/* Name */}
      <h3 className="admin-staff-name">{member.name}</h3>

      {/* Designation */}
      <p className="admin-staff-role" style={{ color: '#2563eb' }}>{member.designation}</p>

      {/* Section badge */}
      {member.section && (
        <span className="admin-badge" style={{
          background: '#f1f5f9',
          color: '#475569',
          marginTop: 8,
          display: 'inline-flex',
        }}>
          {member.section}
        </span>
      )}

      {/* Actions */}
      <div className="admin-card-actions" style={{ marginTop: 14 }}>
        <button onClick={() => onEdit(member)} className="admin-card-btn-edit">Edit</button>
        <button onClick={() => onDelete(member)} className="admin-card-btn-delete">Delete</button>
      </div>
    </div>
  )
}
