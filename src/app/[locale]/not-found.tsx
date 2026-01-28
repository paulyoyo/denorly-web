import { Link } from '@/navigation'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        La página que buscas no existe.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-sky-500 px-6 py-3 text-sm font-medium text-white hover:bg-sky-600"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
