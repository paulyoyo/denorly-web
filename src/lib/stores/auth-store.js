import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'denorly-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => () => {
        // Set isLoading to false after hydration completes
        useAuthStore.setState({ isLoading: false })
      },
    }
  )
)
