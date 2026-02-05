'use client'

import { useTranslations } from 'next-intl'

import { Link } from '@/navigation'

export default function Home() {
  const tAuth = useTranslations('auth')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="text-center">
        <h1 className="text-primary-600 text-3xl font-bold md:text-4xl">
          Bienvenido a Denorly
        </h1>
        <p className="mt-4 text-base text-gray-600 md:text-lg">
          Gestión de formularios simplificada
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="bg-primary-600 hover:bg-primary-700 inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-base font-medium text-white transition-colors"
          >
            {tAuth('login')}
          </Link>
          <Link
            href="/register"
            className="border-primary-600 text-primary-600 hover:bg-primary-50 inline-flex min-h-[44px] items-center justify-center rounded-lg border px-6 py-3 text-base font-medium transition-colors"
          >
            {tAuth('register')}
          </Link>
        </div>
      </div>
    </main>
  )
}
