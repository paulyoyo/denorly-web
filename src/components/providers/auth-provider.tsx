'use client'

import { useEffect } from 'react'

import { useAuthStore } from '@/lib/stores/auth-store'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { hydrate, token, setLoading } = useAuthStore()

  // Hydrate auth state on mount
  useEffect(() => {
    hydrate()
  }, [hydrate])

  // Listen for storage events (multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'denorly-auth') {
        const parsed = event.newValue ? JSON.parse(event.newValue) : null
        const newToken = parsed?.state?.token || null

        if (!newToken && token) {
          // Token was removed in another tab
          useAuthStore.getState().logout()
        } else if (newToken && !token) {
          // Token was added in another tab
          hydrate()
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [token, hydrate])

  // Set loading to false once hydration is complete
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 100)
    return () => clearTimeout(timeout)
  }, [setLoading])

  return <>{children}</>
}
