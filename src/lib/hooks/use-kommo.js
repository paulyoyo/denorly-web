'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import * as kommoApi from '@/lib/api/kommo'

export function useKommoIntegration() {
  return useQuery({
    queryKey: ['kommo-integration'],
    queryFn: kommoApi.getKommoIntegration,
  })
}

export function useConnectKommo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials) => kommoApi.connectKommo(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kommo-integration'] })
      toast.success('Kommo conectado exitosamente')
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Error al conectar con Kommo'
      toast.error(message)
    },
  })
}

export function useUpdateKommoIntegration() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => kommoApi.updateKommoIntegration(data),
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
