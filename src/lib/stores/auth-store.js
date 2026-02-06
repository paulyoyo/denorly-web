import { create } from 'zustand'

const STORAGE_KEY = 'denorly-auth'

// Read initial state from localStorage (client-side only)
function getInitialState() {
  if (typeof window === 'undefined') {
    return { user: null, token: null, isAuthenticated: false }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { user: null, token: null, isAuthenticated: false }
    const parsed = JSON.parse(raw)
    return {
      user: parsed.user || null,
      token: parsed.token || null,
      isAuthenticated: !!parsed.token,
    }
  } catch {
    return { user: null, token: null, isAuthenticated: false }
  }
}

// Save state to localStorage
function saveToStorage(state) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user: state.user,
        token: state.token,
      })
    )
  } catch {
    // Ignore storage errors
  }
}

// Clear localStorage
function clearStorage() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage errors
  }
}

const initialState = getInitialState()

export const useAuthStore = create((set) => ({
  user: initialState.user,
  token: initialState.token,
  isAuthenticated: initialState.isAuthenticated,
  isHydrated: typeof window !== 'undefined', // true on client, false on server

  setUser: (user) =>
    set((state) => {
      const newState = { ...state, user, isAuthenticated: !!user }
      saveToStorage(newState)
      return newState
    }),

  loginSuccess: (user, token) =>
    set(() => {
      const newState = { user, token, isAuthenticated: true }
      saveToStorage(newState)
      return newState
    }),

  logout: () =>
    set(() => {
      clearStorage()
      return { user: null, token: null, isAuthenticated: false }
    }),

  // Call this on client mount to ensure hydration
  hydrate: () =>
    set(() => {
      const state = getInitialState()
      return { ...state, isHydrated: true }
    }),
}))

// Simple hook for components
export function useIsHydrated() {
  return useAuthStore((state) => state.isHydrated)
}
