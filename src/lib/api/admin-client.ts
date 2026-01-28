import axios from 'axios'

import { clearAdminToken, getAdminToken } from '@/lib/utils/admin-token'

export const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

adminApi.interceptors.request.use(
  (config) => {
    const token = getAdminToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (typeof window !== 'undefined') {
      const locale = document.documentElement.lang || 'es'
      config.headers['Accept-Language'] = locale
    }
    return config
  },
  (error) => Promise.reject(error)
)

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAdminToken()
      if (typeof window !== 'undefined') {
        const locale = document.documentElement.lang || 'es'
        window.location.href = `/${locale}/admin/login`
      }
    }
    return Promise.reject(error)
  }
)
