import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import {
  clearAdminToken,
  getAdminToken,
  setAdminToken,
} from '@/lib/utils/admin-token'

import type { User } from '@/types/api'

interface AdminAuthState {
  adminUser: User | null
  adminToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
  hydrate: () => void
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      adminUser: null,
      adminToken: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (adminUser) =>
        set({ adminUser, isAuthenticated: !!adminUser }),

      setToken: (adminToken) => {
        if (adminToken) {
          setAdminToken(adminToken)
        } else {
          clearAdminToken()
        }
        set({ adminToken })
      },

      setLoading: (isLoading) => set({ isLoading }),

      logout: () => {
        clearAdminToken()
        set({
          adminUser: null,
          adminToken: null,
          isAuthenticated: false,
        })
      },

      hydrate: () => {
        const adminToken = getAdminToken()
        const currentState = get()
        if (adminToken && !currentState.adminToken) {
          set({ adminToken, isLoading: true })
        } else if (!adminToken) {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'denorly-admin-auth',
      partialize: (state) => ({
        adminUser: state.adminUser,
        adminToken: state.adminToken,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false
          state.isAuthenticated = !!state.adminUser
        }
      },
    }
  )
)
