'use client'

import { useEffect } from 'react'

import { AuthLayout } from '@/components/layout/auth-layout'
import { PageSpinner } from '@/components/ui/spinner'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useRouter } from '@/navigation'

export default function AuthRouteLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/forms')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
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
