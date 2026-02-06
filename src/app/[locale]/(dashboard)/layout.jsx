'use client'

import { useEffect, useState } from 'react'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PageSpinner } from '@/components/ui/spinner'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useRouter } from '@/navigation'

export default function DashboardRouteLayout({ children }) {
  const [isReady, setIsReady] = useState(false)
  const { isAuthenticated, hydrate } = useAuthStore()
  const router = useRouter()

  // Hydrate on mount
  useEffect(() => {
    hydrate()
    setIsReady(true)
  }, [hydrate])

  // Redirect if not authenticated
  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isReady, isAuthenticated, router])

  if (!isReady || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PageSpinner />
      </div>
    )
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
