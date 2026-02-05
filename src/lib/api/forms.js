import { api } from './client'

function addEndpointUrl(form) {
  if (!form.endpointUrl && form.token) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1'
    form.endpointUrl = `${baseUrl}/f/${form.token}`
  }
  return form
}

export async function getForms(params) {
  const { data } = await api.get('/forms', { params })
  const forms = (data.forms ?? data.data ?? []).map(addEndpointUrl)
  return {
    data: forms,
    meta: data.meta,
  }
}

export async function getForm(id) {
  const { data } = await api.get(`/forms/${id}`)
  return addEndpointUrl(data.form ?? data)
}

export async function createForm(formData) {
  const { data } = await api.post('/forms', formData)
  return addEndpointUrl(data.form ?? data)
}

export async function updateForm(id, formData) {
  const { data } = await api.patch(`/forms/${id}`, formData)
  return addEndpointUrl(data.form ?? data)
}

export async function deleteForm(id) {
  await api.delete(`/forms/${id}`)
}
