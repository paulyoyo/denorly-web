'use client'

import { useCallback } from 'react'
import toast from 'react-hot-toast'

import { adminApi } from '@/lib/api/admin-client'
import { useAdminAuthStore } from '@/lib/stores/admin-auth-store'

import type { LoginResponse, User } from '@/types/api'

export function useAdminAuth() {
  const {
    adminUser: user,
    isAuthenticated,
    isLoading,
    setUser,
    setToken,
    setLoading,
    logout: storeLogout,
  } = useAdminAuthStore()

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true)
        const { data } = await adminApi.post<LoginResponse>('/admin/auth/login', {
          email,
          password,
        })
        setToken(data.token)
        setUser(data.user)
        return data
      } catch {
        toast.error('Credenciales inválidas')
        throw new Error('Login failed')
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setToken, setUser]
  )

  const logout = useCallback(async () => {
    try {
      await adminApi.post('/admin/auth/logout')
    } catch {
      // Ignore
    } finally {
      storeLogout()
    }
  }, [storeLogout])

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await adminApi.get<User>('/admin/auth/me')
      setUser(data)
      return data
    } catch {
      storeLogout()
      return null
    } finally {
      setLoading(false)
    }
  }, [setLoading, setUser, storeLogout])

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    fetchUser,
  }
}
