'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import * as webhooksApi from '@/lib/api/webhooks'

export function useWebhooks(formId) {
  return useQuery({
    queryKey: ['webhooks', formId],
    queryFn: () => webhooksApi.getWebhooks(formId),
    enabled: !!formId,
  })
}

export function useCreateWebhook(formId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => webhooksApi.createWebhook(formId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks', formId] })
      toast.success('Webhook creado')
    },
    onError: () => {
      toast.error('Error al crear webhook')
    },
  })
}

export function useUpdateWebhook(formId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ webhookId, data }) =>
      webhooksApi.updateWebhook(formId, webhookId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks', formId] })
      toast.success('Webhook actualizado')
    },
    onError: () => {
      toast.error('Error al actualizar webhook')
    },
  })
}

export function useDeleteWebhook(formId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (webhookId) => webhooksApi.deleteWebhook(formId, webhookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks', formId] })
      toast.success('Webhook eliminado')
    },
    onError: () => {
      toast.error('Error al eliminar webhook')
    },
  })
}
