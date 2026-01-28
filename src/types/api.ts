// User types
export interface User {
  id: string
  email: string
  name: string
  companyName?: string
  role: 'tenant' | 'admin' | 'super_admin'
  emailConfirmedAt?: string
  createdAt: string
  updatedAt: string
}

// Form types
export interface Form {
  id: string
  name: string
  description?: string
  endpoint: string
  allowedDomains?: string[]
  redirectUrl?: string
  successMessage?: string
  isActive: boolean
  submissionsCount: number
  createdAt: string
  updatedAt: string
}

export interface CreateFormData {
  name: string
  description?: string
  allowedDomains?: string[]
  redirectUrl?: string
  successMessage?: string
}

export interface UpdateFormData extends Partial<CreateFormData> {
  isActive?: boolean
}

// Submission types
export interface Submission {
  id: string
  formId: string
  payload: Record<string, unknown>
  metadata: SubmissionMetadata
  createdAt: string
}

export interface SubmissionMetadata {
  ip?: string
  userAgent?: string
  referer?: string
  origin?: string
}

// Email template types
export interface EmailTemplate {
  id: string
  formId: string
  type: 'owner_notification' | 'visitor_autoresponse'
  enabled: boolean
  subject: string
  bodyHtml: string
  bodyText?: string
  fromName?: string
  replyTo?: string
  createdAt: string
  updatedAt: string
}

export interface UpdateEmailTemplateData {
  enabled?: boolean
  subject?: string
  bodyHtml?: string
  bodyText?: string
  fromName?: string
  replyTo?: string
}

// Webhook types
export interface Webhook {
  id: string
  formId: string
  name: string
  url: string
  method: 'POST' | 'PUT' | 'PATCH'
  headers?: Record<string, string>
  payloadTemplate?: string
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateWebhookData {
  name: string
  url: string
  method: 'POST' | 'PUT' | 'PATCH'
  headers?: Record<string, string>
  payloadTemplate?: string
  enabled?: boolean
}

export type UpdateWebhookData = Partial<CreateWebhookData>

// Kommo integration types
export interface KommoIntegration {
  id: string
  tenantId: string
  subdomain: string
  pipelineId?: number
  statusId?: number
  fieldMapping?: Record<string, string>
  connected: boolean
  lastSyncAt?: string
  createdAt: string
  updatedAt: string
}

export interface UpdateKommoIntegrationData {
  pipelineId?: number
  statusId?: number
  fieldMapping?: Record<string, string>
}

// API response types
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiError {
  message: string
  code?: string
  errors?: Record<string, string[]>
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  companyName?: string
}

export interface RegisterResponse {
  user: User
  message: string
}

export interface ResetPasswordData {
  token: string
  password: string
}

// Query params
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface FormsQueryParams extends PaginationParams {
  search?: string
  isActive?: boolean
}

export interface SubmissionsQueryParams extends PaginationParams {
  search?: string
}
