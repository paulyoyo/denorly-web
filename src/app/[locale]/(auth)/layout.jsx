'use client'

import { useEffect } from 'react'

import { AuthLayout } from '@/components/layout/auth-layout'
import { PageSpinner } from '@/components/ui/spinner'
import { useAuthStore, useHasHydrated } from '@/lib/stores/auth-store'
import { useRouter } from '@/navigation'

export default function AuthRouteLayout({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const hasHydrated = useHasHydrated()
  const router = useRouter()

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace('/forms')
    }
  }, [hasHydrated, isAuthenticated, router])

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PageSpinner />
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return <AuthLayout>{children}</AuthLayout>
}
