import axios from 'axios'

import { useAuthStore } from '@/lib/stores/auth-store'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Fallback: if default header not set, try reading from store
    if (!config.headers.Authorization) {
      const token = useAuthStore.getState().token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    // Add Accept-Language header based on current locale
    if (typeof window !== 'undefined') {
      const locale = document.documentElement.lang || 'es'
      config.headers['Accept-Language'] = locale
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response

      // Handle 401 Unauthorized (skip for login/register endpoints)
      if (status === 401) {
        const url = error.config?.url || ''
        if (!url.includes('/auth/login') && !url.includes('/auth/register')) {
          setAuthToken(null)
          useAuthStore.getState().logout()
        }
      }

      // Handle 422 Validation errors
      if (status === 422) {
        const validationErrors = error.response.data?.errors
        if (validationErrors) {
          error.validationErrors = validationErrors
        }
      }

      // Handle 500 Server errors
      if (status >= 500) {
        console.error('Server error:', error.response.data)
      }
    }

    return Promise.reject(error)
  }
)
