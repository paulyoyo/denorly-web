import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { clearToken, getToken, setToken } from '@/lib/utils/token'

import type { User } from '@/types/api'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setToken: (token) => {
        if (token) {
          setToken(token)
        } else {
          clearToken()
        }
        set({ token })
      },

      setLoading: (isLoading) => set({ isLoading }),

      logout: () => {
        clearToken()
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      hydrate: () => {
        const token = getToken()

        if (token) {
          set({ token, isLoading: false })
        } else {
          // No token in localStorage — clear stale persisted state
          set({ user: null, token: null, isAuthenticated: false, isLoading: false })
        }
      },
    }),
    {
      name: 'denorly-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false
          state.isAuthenticated = !!state.user
        }
      },
    }
  )
)
