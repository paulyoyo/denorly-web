'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { adminApi } from '@/lib/api/admin-client'

export function useAdminTenants(params) {
  return useQuery({
    queryKey: ['admin-tenants', params],
    queryFn: async () => {
      const { data } = await adminApi.get('/admin/tenants', { params })
      return data
    },
  })
}

export function useAdminTenant(id) {
  return useQuery({
    queryKey: ['admin-tenants', id],
    queryFn: async () => {
      const { data } = await adminApi.get(`/admin/tenants/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export function useChangeTenantPlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, plan }) => {
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
    mutationFn: async ({ id, reason }) => {
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
    mutationFn: async (id) => {
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
    mutationFn: async (id) => {
      const { data } = await adminApi.post(`/admin/tenants/${id}/impersonate`)
      return data
    },
  })
}
