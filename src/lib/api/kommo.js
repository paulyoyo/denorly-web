import { api } from './client'

export async function getKommoIntegration() {
  try {
    const { data } = await api.get('/kommo/integration')
    return data
  } catch {
    return null
  }
}

export async function connectKommo(credentials) {
  const { data } = await api.post('/kommo/integration', credentials)
  return data
}

export async function updateKommoIntegration(updateData) {
  const { data } = await api.patch('/kommo/integration', updateData)
  return data
}

export async function disconnectKommo() {
  await api.delete('/kommo/integration')
}
