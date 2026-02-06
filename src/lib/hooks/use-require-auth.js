'use client'

import { useEffect } from 'react'

import { useAuth } from './use-auth'

import { useHasHydrated } from '@/lib/stores/auth-store'
import { useRouter } from '@/navigation'

export function useRequireAuth(redirectTo = '/login') {
  const { user, isAuthenticated, fetchUser } = useAuth()
  const hasHydrated = useHasHydrated()
  const router = useRouter()

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace(redirectTo)
    }
  }, [hasHydrated, isAuthenticated, router, redirectTo])

  useEffect(() => {
    if (hasHydrated && isAuthenticated && !user) {
      fetchUser()
    }
  }, [hasHydrated, isAuthenticated, user, fetchUser])

  return {
    user,
    isLoading: !hasHydrated,
    isAuthenticated,
  }
}
