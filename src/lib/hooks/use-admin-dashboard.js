'use client'

import { useQuery } from '@tanstack/react-query'

import { adminApi } from '@/lib/api/admin-client'

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const { data } = await adminApi.get('/admin/dashboard')
      return data
    },
  })
}
