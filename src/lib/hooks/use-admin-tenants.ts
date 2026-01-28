'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { adminApi } from '@/lib/api/admin-client'

import type { PaginatedResponse, PaginationParams, User } from '@/types/api'

interface Tenant extends User {
  plan: string
  status: 'active' | 'suspended'
  formsCount: number
  submissionsCount: number
  hasKommo: boolean
}

interface TenantsQueryParams extends PaginationParams {
  search?: string
  plan?: string
  status?: string
  hasKommo?: boolean
}

export function useAdminTenants(params?: TenantsQueryParams) {
  return useQuery({
    queryKey: ['admin-tenants', params],
    queryFn: async () => {
      const { data } = await adminApi.get<PaginatedResponse<Tenant>>(
        '/admin/tenants',
        { params }
      )
      return data
    },
  })
}

export function useAdminTenant(id: string) {
  return useQuery({
    queryKey: ['admin-tenants', id],
    queryFn: async () => {
      const { data } = await adminApi.get<Tenant>(`/admin/tenants/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export function useChangeTenantPlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, plan }: { id: string; plan: string }) => {
      await adminApi.patch(`/admin/tenants/${id}/plan`, { plan })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tenants'] })
      toast.success('Plan actualizado')
    },
  })
}

export function useSuspendTenant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      await adminApi.post(`/admin/tenants/${id}/suspend`, { reason })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tenants'] })
      toast.success('Tenant suspendido')
    },
  })
}

export function useReactivateTenant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await adminApi.post(`/admin/tenants/${id}/reactivate`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tenants'] })
      toast.success('Tenant reactivado')
    },
  })
}

export function useImpersonateTenant() {
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await adminApi.post<{ token: string }>(
        `/admin/tenants/${id}/impersonate`
      )
      return data
    },
  })
}
