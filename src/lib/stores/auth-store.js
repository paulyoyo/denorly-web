import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create()(
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
        const { token } = get()
        set({
          isAuthenticated: !!token,
          isLoading: false,
        })
      },
    }),
    {
      name: 'denorly-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          // Use setTimeout to ensure this runs after hydration is complete
          setTimeout(() => {
            useAuthStore.getState().hydrate()
          }, 0)
        }
      },
    }
  )
)
