import { Link } from 'react-router-dom'

/**
 * DeptCard — homepage department card with spacious height, image banner,
 * description, intake info, and action buttons.
 */
export default function DeptCard({ dept }) {
  const { cardTitle, image, description, intake, direct2ndYear, slug } = dept
  return (
    <div className="w-full max-w-sm h-full flex">
      <div className="dept-card h-full flex flex-col justify-between w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
        <div>
          <img
            className="w-full h-56 object-cover"
            alt={cardTitle || ''}
            src={image || '/assets/images/dept-computer.jpeg'}
            loading="lazy"
          />
          <div className="p-6">
            <h3 className="font-bold text-xl text-gray-900">{cardTitle}</h3>
            {description && (
              <p className="text-gray-600 text-sm mt-2.5 leading-relaxed line-clamp-3">{description}</p>
            )}
            <div className="flex items-center gap-3 mt-4 text-sm text-gray-500 font-medium">
              <span>Intake: {intake || 30}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>Direct 2nd Year: {direct2ndYear ? 'Yes' : 'No'}</span>
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
            to={`/departments/${slug}`}
            className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
