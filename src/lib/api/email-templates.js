import { api } from './client'

export async function getEmailTemplates(formId) {
  const { data } = await api.get(`/forms/${formId}/email-templates`)
  return data.emailTemplates ?? data
}

export async function updateEmailTemplate(formId, templateId, templateData) {
  const { data } = await api.patch(
    `/forms/${formId}/email-templates/${templateId}`,
    templateData
  )
  return data.emailTemplate ?? data
}
