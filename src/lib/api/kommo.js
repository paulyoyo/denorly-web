import { api } from './client'

export async function getKommoIntegration() {
  try {
    const { data } = await api.get('/integrations/kommo')
    return data
  } catch {
    return null
  }
}

export async function getKommoAuthUrl() {
  const { data } = await api.get('/integrations/kommo/auth-url')
  return data.url
}

export async function updateKommoIntegration(updateData) {
  const { data } = await api.patch('/integrations/kommo', updateData)
  return data
}

export async function disconnectKommo() {
  await api.delete('/integrations/kommo')
}
