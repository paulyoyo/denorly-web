'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import * as formsApi from '@/lib/api/forms'

export function useForms(params) {
  return useQuery({
    queryKey: ['forms', params],
    queryFn: () => formsApi.getForms(params),
  })
}

export function useForm(id) {
  return useQuery({
    queryKey: ['forms', id],
    queryFn: () => formsApi.getForm(id),
    enabled: !!id,
  })
}

export function useCreateForm() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => formsApi.createForm(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] })
      toast.success('Formulario creado')
    },
    onError: () => {
      toast.error('Error al crear formulario')
    },
  })
}

export function useUpdateForm() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => formsApi.updateForm(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] })
      toast.success('Formulario actualizado')
    },
    onError: () => {
      toast.error('Error al actualizar formulario')
    },
  })
}

export function useDeleteForm() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => formsApi.deleteForm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] })
      toast.success('Formulario eliminado')
    },
    onError: () => {
      toast.error('Error al eliminar formulario')
    },
  })
}
