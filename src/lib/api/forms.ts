import { api } from './client'

import type {
  CreateFormData,
  Form,
  FormsQueryParams,
  PaginatedResponse,
  UpdateFormData,
} from '@/types/api'

export async function getForms(
  params?: FormsQueryParams
): Promise<PaginatedResponse<Form>> {
  const { data } = await api.get<PaginatedResponse<Form>>('/forms', { params })
  return data
}

export async function getForm(id: string): Promise<Form> {
  const { data } = await api.get<Form>(`/forms/${id}`)
  return data
}

export async function createForm(formData: CreateFormData): Promise<Form> {
  const { data } = await api.post<Form>('/forms', formData)
  return data
}

export async function updateForm(
  id: string,
  formData: UpdateFormData
): Promise<Form> {
  const { data } = await api.patch<Form>(`/forms/${id}`, formData)
  return data
}

export async function deleteForm(id: string): Promise<void> {
  await api.delete(`/forms/${id}`)
}
