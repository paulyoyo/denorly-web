import { api } from './client'

import type { KommoIntegration, UpdateKommoIntegrationData } from '@/types/api'

export async function getKommoIntegration(): Promise<KommoIntegration | null> {
  try {
    const { data } = await api.get<KommoIntegration>('/integrations/kommo')
    return data
  } catch {
    return null
  }
}

export async function getKommoAuthUrl(): Promise<string> {
  const { data } = await api.get<{ url: string }>('/integrations/kommo/auth-url')
  return data.url
}

export async function updateKommoIntegration(
  updateData: UpdateKommoIntegrationData
): Promise<KommoIntegration> {
  const { data } = await api.patch<KommoIntegration>(
    '/integrations/kommo',
    updateData
  )
  return data
}

export async function disconnectKommo(): Promise<void> {
  await api.delete('/integrations/kommo')
}
