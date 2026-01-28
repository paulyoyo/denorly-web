'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import * as kommoApi from '@/lib/api/kommo'

import type { UpdateKommoIntegrationData } from '@/types/api'

export function useKommoIntegration() {
  return useQuery({
    queryKey: ['kommo-integration'],
    queryFn: kommoApi.getKommoIntegration,
  })
}

export function useKommoAuthUrl() {
  return useQuery({
    queryKey: ['kommo-auth-url'],
    queryFn: kommoApi.getKommoAuthUrl,
    enabled: false,
  })
}

export function useUpdateKommoIntegration() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateKommoIntegrationData) =>
      kommoApi.updateKommoIntegration(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kommo-integration'] })
      toast.success('Integración actualizada')
    },
    onError: () => {
      toast.error('Error al actualizar integración')
    },
  })
}

export function useDisconnectKommo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: kommoApi.disconnectKommo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kommo-integration'] })
      toast.success('Kommo desconectado')
    },
    onError: () => {
      toast.error('Error al desconectar')
    },
  })
}
