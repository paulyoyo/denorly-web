'use client'

import { useEffect } from 'react'

import { AdminLayout } from '@/components/admin/admin-layout'
import { PageSpinner } from '@/components/ui/spinner'
import { useAdminAuthStore } from '@/lib/stores/admin-auth-store'
import { useRouter } from '@/navigation'

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  const { isAuthenticated, isLoading, hydrate } = useAdminAuthStore()
  const router = useRouter()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/admin/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PageSpinner />
      </div>
    )
  }

  return <AdminLayout>{children}</AdminLayout>
}
