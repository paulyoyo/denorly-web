'use client'

import { useTranslations } from 'next-intl'

import { Link } from '@/navigation'

export default function Home() {
  const tAuth = useTranslations('auth')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary-600 md:text-4xl">
          Bienvenido a Denorly
        </h1>
        <p className="mt-4 text-base text-gray-600 md:text-lg">
          Gestión de formularios simplificada
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary-700"
          >
            {tAuth('login')}
          </Link>
          <Link
            href="/register"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-primary-600 px-6 py-3 text-base font-medium text-primary-600 transition-colors hover:bg-primary-50"
          >
            {tAuth('register')}
          </Link>
        </div>
      </div>
    </main>
  )
}
