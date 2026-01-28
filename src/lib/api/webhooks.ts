import { api } from './client'

import type {
  CreateWebhookData,
  UpdateWebhookData,
  Webhook,
} from '@/types/api'

export async function getWebhooks(formId: string): Promise<Webhook[]> {
  const { data } = await api.get<Webhook[]>(`/forms/${formId}/webhooks`)
  return data
}

export async function createWebhook(
  formId: string,
  webhookData: CreateWebhookData
): Promise<Webhook> {
  const { data } = await api.post<Webhook>(
    `/forms/${formId}/webhooks`,
    webhookData
  )
  return data
}

export async function updateWebhook(
  formId: string,
  webhookId: string,
  webhookData: UpdateWebhookData
): Promise<Webhook> {
  const { data } = await api.patch<Webhook>(
    `/forms/${formId}/webhooks/${webhookId}`,
    webhookData
  )
  return data
}

export async function deleteWebhook(
  formId: string,
  webhookId: string
): Promise<void> {
  await api.delete(`/forms/${formId}/webhooks/${webhookId}`)
}
