import { api } from './client'

export async function getWebhooks(formId) {
  const { data } = await api.get(`/forms/${formId}/webhooks`)
  return data.webhooks ?? data
}

export async function createWebhook(formId, webhookData) {
  const { data } = await api.post(`/forms/${formId}/webhooks`, webhookData)
  return data.webhook ?? data
}

export async function updateWebhook(formId, webhookId, webhookData) {
  const { data } = await api.patch(
    `/forms/${formId}/webhooks/${webhookId}`,
    webhookData
  )
  return data.webhook ?? data
}

export async function deleteWebhook(formId, webhookId) {
  await api.delete(`/forms/${formId}/webhooks/${webhookId}`)
}
