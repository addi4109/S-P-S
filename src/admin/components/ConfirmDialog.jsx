/** ConfirmDialog — standard modal confirm used for destructive actions (delete). */
export default function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="admin-modal-backdrop" onClick={onCancel}>
      <div className="admin-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="admin-confirm-title">{title}</h3>

        {message && (
          <p className="admin-confirm-message">
            Are you sure you want to delete <strong>"{message}"</strong>? This action cannot be undone.
          </p>
        )}

        <div className="admin-confirm-actions">
          <button
            onClick={onCancel}
            className="admin-btn admin-btn-secondary"
            style={{ flex: 1 }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="admin-btn admin-btn-danger"
            style={{ flex: 1 }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
