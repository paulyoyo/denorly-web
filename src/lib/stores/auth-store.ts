import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { User } from '@/types/api'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (isLoading: boolean) => void
  loginSuccess: (user: User, token: string) => void
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

      setToken: (token) => set({ token }),

      setLoading: (isLoading) => set({ isLoading }),

      loginSuccess: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      hydrate: () => {
        const { token, user } = get()

        if (token) {
          set({ isAuthenticated: !!user, isLoading: false })
        } else {
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
