import { api } from './client'

import type { EmailTemplate, UpdateEmailTemplateData } from '@/types/api'

export async function getEmailTemplates(
  formId: string
): Promise<EmailTemplate[]> {
  const { data } = await api.get<EmailTemplate[]>(
    `/forms/${formId}/email-templates`
  )
  return data
}

export async function updateEmailTemplate(
  formId: string,
  templateId: string,
  templateData: UpdateEmailTemplateData
): Promise<EmailTemplate> {
  const { data } = await api.patch<EmailTemplate>(
    `/forms/${formId}/email-templates/${templateId}`,
    templateData
  )
  return data
}
