import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page Not Found')
  return (
    <section className="min-h-[70vh] bg-white mt-24 px-6 py-24 text-center">
      <p className="text-7xl font-bold text-blue-600">404</p>
      <h1 className="text-3xl font-bold text-gray-900 mt-4">Page Not Found</h1>
      <p className="text-gray-600 mt-3 max-w-xl mx-auto">
        The page you are looking for doesn't exist or has been moved. Head back to the
        homepage to continue exploring SPS, Satara.
      </p>
      <Link
        to="/"
        className="inline-block mt-8 px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </section>
  )
}
