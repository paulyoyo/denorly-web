'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import * as emailTemplatesApi from '@/lib/api/email-templates'

export function useEmailTemplates(formId) {
  return useQuery({
    queryKey: ['email-templates', formId],
    queryFn: () => emailTemplatesApi.getEmailTemplates(formId),
    enabled: !!formId,
  })
}

export function useUpdateEmailTemplate(formId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ templateId, data }) =>
      emailTemplatesApi.updateEmailTemplate(formId, templateId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-templates', formId] })
      toast.success('Plantilla actualizada')
    },
    onError: () => {
      toast.error('Error al actualizar plantilla')
    },
  })
}
