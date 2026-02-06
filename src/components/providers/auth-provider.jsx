'use client'

import { useEffect } from 'react'

import { setAuthToken } from '@/lib/api/client'
import { useAuthStore } from '@/lib/stores/auth-store'

export function AuthProvider({ children }) {
  const token = useAuthStore((s) => s.token)
  const hydrate = useAuthStore((s) => s.hydrate)

  // Hydrate on mount
  useEffect(() => {
    hydrate()
  }, [hydrate])

  // Sync token to axios whenever it changes
  useEffect(() => {
    setAuthToken(token)
  }, [token])

  // Listen for storage events (multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'denorly-auth') {
        // Re-hydrate from localStorage when changed in another tab
        hydrate()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [hydrate])

  return <>{children}</>
}
