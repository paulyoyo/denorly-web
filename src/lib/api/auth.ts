import { api } from './client'

import type {
  LoginCredentials,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  ResetPasswordData,
  User,
} from '@/types/api'

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials)
  return data
}

export async function register(
  registerData: RegisterData
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>('/auth/register', {
    user: {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      password_confirmation: registerData.passwordConfirmation,
      company_name: registerData.companyName,
    },
  })
  return data
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout')
}

export async function forgotPassword(email: string): Promise<void> {
  await api.post('/auth/forgot-password', { email })
}

export async function resetPassword(
  resetData: ResetPasswordData
): Promise<void> {
  await api.post('/auth/reset-password', resetData)
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/auth/me')
  return data
}

export async function updateMe(
  updateData: Partial<Pick<User, 'name' | 'companyName'>>
): Promise<User> {
  const { data } = await api.patch<User>('/auth/me', updateData)
  return data
}
