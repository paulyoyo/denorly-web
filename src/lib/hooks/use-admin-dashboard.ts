'use client'

import { useQuery } from '@tanstack/react-query'

import { adminApi } from '@/lib/api/admin-client'

interface DashboardStats {
  totalTenants: number
  activeLast7d: number
  totalSubmissions: number
  submissionsThisMonth: number
  submissionsByDay: { date: string; count: number }[]
  planDistribution: { name: string; value: number }[]
  topTenants: { name: string; submissions: number }[]
}

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const { data } = await adminApi.get<DashboardStats>('/admin/dashboard')
      return data
    },
  })
}
