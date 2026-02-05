import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { Providers } from './providers'

import { routing } from '@/i18n/routing'


import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: {
    default: 'Denorly',
    template: '%s | Denorly',
  },
  description:
    'Denorly - Plataforma de gestión de formularios y automatización',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
  ),
  openGraph: {
    title: 'Denorly',
    description:
      'Denorly - Plataforma de gestión de formularios y automatización',
    type: 'website',
  },
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params

  // Validate locale
  if (!routing.locales.includes(locale)) {
    notFound()
  }

  // Get messages for the locale
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
