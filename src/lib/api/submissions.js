import { api } from './client'

export async function getSubmissions(formId, params) {
  const { data } = await api.get(`/forms/${formId}/submissions`, { params })
  return {
    data: data.submissions ?? data.data ?? [],
    meta: data.meta,
  }
}

export async function getSubmission(formId, id) {
  const { data } = await api.get(`/forms/${formId}/submissions/${id}`)
  return data.submission ?? data
}

export async function deleteSubmission(formId, id) {
  await api.delete(`/forms/${formId}/submissions/${id}`)
}
