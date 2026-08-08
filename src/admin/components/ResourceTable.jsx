/**
 * ResourceTable — list rows for a resource with an image thumbnail and
 * Edit / Delete actions.
 */
export default function ResourceTable({ config, rows, onEdit, onDelete }) {
  if (!rows.length) {
    return (
      <p className="text-sm text-gray-500 py-10 text-center bg-white rounded-xl border border-gray-200">
        No {config.label.toLowerCase()} yet — click “Add {config.singular}”.
      </p>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
          <tr>
            {config.imageField && <th className="px-4 py-3 font-medium">Image</th>}
            <th className="px-4 py-3 font-medium">{config.singular}</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => {
            const img = config.imageField && row[config.imageField]
            return (
              <tr key={row._id || row.src || row.slug || row.email || row.key} className="hover:bg-gray-50">
                {config.imageField && (
                  <td className="px-4 py-3">
                    {img ? (
                      <img src={img} alt="" className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                )}
                <td className="px-4 py-3 text-gray-900 font-medium break-words">
                  {row[config.listField] || row._id}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => onEdit(row)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button onClick={() => onDelete(row)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
