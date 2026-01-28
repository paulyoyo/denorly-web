'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { adminApi } from '@/lib/api/admin-client'

import type { User } from '@/types/api'

interface CreateAdminData {
  name: string
  email: string
  password: string
  role: 'admin' | 'super_admin'
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data } = await adminApi.get<User[]>('/admin/users')
      return data
    },
  })
}

export function useCreateAdminUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateAdminData) => {
      const response = await adminApi.post<User>('/admin/users', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success('Admin creado')
    },
    onError: () => {
      toast.error('Error al crear admin')
    },
  })
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await adminApi.delete(`/admin/users/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success('Admin eliminado')
    },
    onError: () => {
      toast.error('Error al eliminar admin')
    },
  })
}
