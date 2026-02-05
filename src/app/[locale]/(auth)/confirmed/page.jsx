'use client'

import { useSearchParams } from 'next/navigation'

import { Link } from '@/navigation'

export default function ConfirmPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success') === 'true'
  const error = searchParams.get('error')

  if (success) {
    return (
      <div className="w-full text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          ¡Correo confirmado!
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión.
        </p>
        <Link
          href="/login"
          className="bg-primary-600 hover:bg-primary-700 inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-base font-medium text-white transition-colors"
        >
          Iniciar sesión
        </Link>
      </div>
    )
  }

  if (error === 'invalid_token') {
    return (
      <div className="w-full text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Enlace inválido
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          El enlace de confirmación es inválido o ha expirado.
        </p>
        <Link
          href="/login"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    )
  }

  // Default error state
  return (
    <div className="w-full text-center">
      <div className="mb-4 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>
      <h2 className="mb-2 text-xl font-bold text-gray-900">Algo salió mal</h2>
      <p className="mb-6 text-sm text-gray-600">
        No pudimos verificar tu correo. Por favor, intenta de nuevo.
      </p>
      <Link
        href="/login"
        className="text-primary-600 hover:text-primary-700 font-medium"
      >
        Volver al inicio de sesión
      </Link>
    </div>
  )
}
