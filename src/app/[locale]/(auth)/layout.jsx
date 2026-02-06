'use client'

import { useEffect, useState } from 'react'

import { AuthLayout } from '@/components/layout/auth-layout'
import { PageSpinner } from '@/components/ui/spinner'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useRouter } from '@/navigation'

export default function AuthRouteLayout({ children }) {
  const [isReady, setIsReady] = useState(false)
  const { isAuthenticated, hydrate } = useAuthStore()
  const router = useRouter()

  // Hydrate on mount
  useEffect(() => {
    hydrate()
    setIsReady(true)
  }, [hydrate])

  // Redirect if authenticated
  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace('/forms')
    }
  }, [isReady, isAuthenticated, router])

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PageSpinner />
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PageSpinner />
      </div>
    )
  }

  return <AuthLayout>{children}</AuthLayout>
}
