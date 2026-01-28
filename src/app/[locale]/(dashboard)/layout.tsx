'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PageSpinner } from '@/components/ui/spinner'
import { useRequireAuth } from '@/lib/hooks/use-require-auth'

interface DashboardRouteLayoutProps {
  children: React.ReactNode
}

export default function DashboardRouteLayout({
  children,
}: DashboardRouteLayoutProps) {
  const { isLoading, isAuthenticated } = useRequireAuth('/login')

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PageSpinner />
      </div>
    )
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
