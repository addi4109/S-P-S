/** Spinner — small centred loading indicator used across the admin panel. */
export default function Spinner({ label = 'Loading…' }) {
  return (
    <div className="admin-spinner-wrap">
      <div className="admin-spinner" />
      <span>{label}</span>
    </div>
  )
}
