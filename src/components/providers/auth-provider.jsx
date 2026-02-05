'use client'

import { useEffect } from 'react'

import { setAuthToken } from '@/lib/api/client'
import { useAuthStore } from '@/lib/stores/auth-store'

export function AuthProvider({ children }) {
  const token = useAuthStore((s) => s.token)

  // After persist rehydration, sync isAuthenticated and isLoading
  useEffect(() => {
    function syncAuth() {
      const { token: t, user } = useAuthStore.getState()
      useAuthStore.setState({
        isAuthenticated: !!t && !!user,
        isLoading: false,
      })
      if (t) {
        setAuthToken(t)
      }
    }

    if (useAuthStore.persist.hasHydrated()) {
      syncAuth()
    } else {
      const unsub = useAuthStore.persist.onFinishHydration(() => {
        syncAuth()
        unsub()
      })
      return unsub
    }
  }, [])

  // Sync token to axios whenever it changes
  useEffect(() => {
    setAuthToken(token)
  }, [token])

  // Listen for storage events (multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'denorly-auth') {
        const parsed = event.newValue ? JSON.parse(event.newValue) : null
        const newToken = parsed?.state?.token || null

        if (!newToken && token) {
          useAuthStore.getState().logout()
          setAuthToken(null)
        } else if (newToken && !token) {
          useAuthStore.persist.rehydrate()
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [token])

  return <>{children}</>
}
