'use client'

interface ErrorPageProps {
  reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gray-900">500</h1>
      <p className="mt-4 text-lg text-gray-600">
        Ha ocurrido un error inesperado.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-sky-500 px-6 py-3 text-sm font-medium text-white hover:bg-sky-600"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
