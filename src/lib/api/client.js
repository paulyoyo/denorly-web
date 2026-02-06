import axios from 'axios'

const STORAGE_KEY = 'denorly-auth'

// --- snake_case ↔ camelCase conversion utilities ---

function camelizeStr(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

function decamelizeStr(str) {
  return str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
}

function camelizeKeys(obj) {
  if (Array.isArray(obj)) return obj.map(camelizeKeys)
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [camelizeStr(k), camelizeKeys(v)])
    )
  }
  return obj
}

function decamelizeKeys(obj) {
  if (Array.isArray(obj)) return obj.map(decamelizeKeys)
  if (
    obj !== null &&
    typeof obj === 'object' &&
    !(obj instanceof Date) &&
    !(obj instanceof FormData)
  ) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [decamelizeStr(k), decamelizeKeys(v)])
    )
  }
  return obj
}

// --- Axios instance ---

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

function getTokenFromStorage() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.token || null
  } catch {
    return null
  }
}

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Convert request body keys from camelCase to snake_case
    if (config.data && !(config.data instanceof FormData)) {
      config.data = decamelizeKeys(config.data)
    }
    if (config.params) {
      config.params = decamelizeKeys(config.params)
    }

    // Always read token fresh from localStorage
    const token = getTokenFromStorage()
    console.log('[API Request]', config.method?.toUpperCase(), config.url, '| Token:', token ? `${token.substring(0, 20)}...` : 'NULL')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
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
  (response) => {
    // Convert response data keys from snake_case to camelCase
    if (response.data && typeof response.data === 'object') {
      response.data = camelizeKeys(response.data)
    }
    return response
  },
  (error) => {
    // Convert error response data too
    if (error.response?.data && typeof error.response.data === 'object') {
      error.response.data = camelizeKeys(error.response.data)
    }

    if (error.response) {
      const { status } = error.response

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
