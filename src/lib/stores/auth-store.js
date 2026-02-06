import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setToken: (token) => set({ token }),

      loginSuccess: (user, token) => {
        // Immediately write to localStorage to avoid race condition
        const state = { user, token, isAuthenticated: true }
        localStorage.setItem(
          'denorly-auth',
          JSON.stringify({ state, version: 0 })
        )
        set(state)
      },

      logout: () => {
        // Immediately clear localStorage
        localStorage.removeItem('denorly-auth')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'denorly-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Hook to check if store has hydrated - uses persist API
export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    // Check if already hydrated
    if (useAuthStore.persist.hasHydrated()) {
      setHasHydrated(true)
      return
    }

    // Subscribe to hydration finish
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true)
    })
    return unsub
  }, [])

  return hasHydrated
}
