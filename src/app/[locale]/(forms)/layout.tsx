'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'

interface FormsRouteLayoutProps {
  children: React.ReactNode
}

export default function FormsRouteLayout({
  children,
}: FormsRouteLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>
}
