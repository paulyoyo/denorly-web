import { api } from './client'

export async function getKommoIntegration() {
  try {
    const { data } = await api.get('/kommo/integration')
    return data
  } catch {
    return null
  }
}

export async function getKommoAuthUrl() {
  const { data } = await api.get('/kommo/auth_url')
  return data.authUrl
}

export async function updateKommoIntegration(updateData) {
  const { data } = await api.patch('/kommo/integration', updateData)
  return data
}

export async function disconnectKommo() {
  await api.delete('/kommo/integration')
}
