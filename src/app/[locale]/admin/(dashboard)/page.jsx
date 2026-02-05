'use client'

import { BarChart3, FileText, Users, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PlanDistributionChart } from '@/components/admin/plan-distribution-chart'
import { StatCard } from '@/components/admin/stat-card'
import { SubmissionsChart } from '@/components/admin/submissions-chart'
import { TopTenantsChart } from '@/components/admin/top-tenants-chart'
import { PageSpinner } from '@/components/ui/spinner'
import { useAdminDashboard } from '@/lib/hooks/use-admin-dashboard'

export default function AdminDashboardPage() {
  const t = useTranslations('admin')
  const { data, isLoading } = useAdminDashboard()

  if (isLoading || !data) return <PageSpinner />

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {t('dashboard')}
      </h1>

      {/* Stats cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Tenants"
          value={data.totalTenants}
          icon={<Users className="h-6 w-6" />}
        />

        <StatCard
          title="Activos (7d)"
          value={data.activeLast7d}
          icon={<Zap className="h-6 w-6" />}
        />

        <StatCard
          title="Submissions"
          value={data.totalSubmissions}
          icon={<FileText className="h-6 w-6" />}
        />

        <StatCard
          title="Este Mes"
          value={data.submissionsThisMonth}
          icon={<BarChart3 className="h-6 w-6" />}
        />
      </div>

      {/* Submissions chart */}
      <div className="mb-6">
        <SubmissionsChart data={data.submissionsByDay} />
      </div>

      {/* Side by side charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PlanDistributionChart data={data.planDistribution} />
        <TopTenantsChart data={data.topTenants} />
      </div>
    </div>
  )
}
