'use client'

import { useAuthStore } from '@/lib/stores/auth-store'

export function useRequireAuth() {
  const { user, isAuthenticated } = useAuthStore()

  return {
    user,
    isAuthenticated,
  }
}
