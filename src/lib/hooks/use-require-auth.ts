'use client'

import { useEffect } from 'react'

import { useRouter } from '@/navigation'

import { useAuth } from './use-auth'

export function useRequireAuth(redirectTo: string = '/login') {
  const { user, isAuthenticated, isLoading, fetchUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo)
    }
  }, [isLoading, isAuthenticated, router, redirectTo])

  useEffect(() => {
    if (!isLoading && isAuthenticated && !user) {
      fetchUser()
    }
  }, [isLoading, isAuthenticated, user, fetchUser])

  return {
    user,
    isLoading,
    isAuthenticated,
  }
}
