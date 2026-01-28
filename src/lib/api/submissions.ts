import { api } from './client'

import type {
  PaginatedResponse,
  Submission,
  SubmissionsQueryParams,
} from '@/types/api'

export async function getSubmissions(
  formId: string,
  params?: SubmissionsQueryParams
): Promise<PaginatedResponse<Submission>> {
  const { data } = await api.get<PaginatedResponse<Submission>>(
    `/forms/${formId}/submissions`,
    { params }
  )
  return data
}

export async function getSubmission(
  formId: string,
  id: string
): Promise<Submission> {
  const { data } = await api.get<Submission>(
    `/forms/${formId}/submissions/${id}`
  )
  return data
}

export async function deleteSubmission(
  formId: string,
  id: string
): Promise<void> {
  await api.delete(`/forms/${formId}/submissions/${id}`)
}
