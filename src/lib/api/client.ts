import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

function getTokenFromStorage(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('denorly-auth')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.state?.token || null
  } catch {
    return null
  }
}

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
    // Read token from axios defaults first, then from localStorage directly
    if (!config.headers.Authorization) {
      const token = getTokenFromStorage()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    console.log('[API]', config.method?.toUpperCase(), config.url, '| Auth:', config.headers.Authorization ? 'YES' : 'NO')

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
          // Lazy import to avoid circular dependency
          import('@/lib/stores/auth-store').then(({ useAuthStore }) => {
            useAuthStore.getState().logout()
          })
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
