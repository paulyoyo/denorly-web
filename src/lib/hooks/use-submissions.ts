'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import * as submissionsApi from '@/lib/api/submissions'

import type { SubmissionsQueryParams } from '@/types/api'

export function useSubmissions(
  formId: string,
  params?: SubmissionsQueryParams
) {
  return useQuery({
    queryKey: ['submissions', formId, params],
    queryFn: () => submissionsApi.getSubmissions(formId, params),
    enabled: !!formId,
  })
}

export function useSubmission(formId: string, id: string) {
  return useQuery({
    queryKey: ['submissions', formId, id],
    queryFn: () => submissionsApi.getSubmission(formId, id),
    enabled: !!formId && !!id,
  })
}

export function useDeleteSubmission(formId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => submissionsApi.deleteSubmission(formId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', formId] })
      toast.success('Envío eliminado')
    },
    onError: () => {
      toast.error('Error al eliminar envío')
    },
  })
}
