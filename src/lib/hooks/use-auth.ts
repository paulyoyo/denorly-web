'use client'

import { useCallback } from 'react'
import toast from 'react-hot-toast'

import * as authApi from '@/lib/api/auth'
import { useAuthStore } from '@/lib/stores/auth-store'

import type { RegisterData } from '@/types/api'

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    setToken,
    setLoading,
    loginSuccess,
    logout: storeLogout,
  } = useAuthStore()

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true)
        const response = await authApi.login({ email, password })
        loginSuccess(response.user, response.token)
        return response
      } catch (error) {
        setLoading(false)
        const message =
          error instanceof Error ? error.message : 'Error al iniciar sesión'
        toast.error(message)
        throw error
      }
    },
    [setLoading, loginSuccess]
  )

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        setLoading(true)
        const response = await authApi.register(data)
        return response
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Error al crear cuenta'
        toast.error(message)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setLoading]
  )

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // Ignore logout API errors
    } finally {
      storeLogout()
    }
  }, [storeLogout])

  const updateProfile = useCallback(
    async (data: Partial<Pick<RegisterData, 'name' | 'companyName'>>) => {
      try {
        setLoading(true)
        const updatedUser = await authApi.updateMe(data)
        setUser(updatedUser)
        toast.success('Perfil actualizado')
        return updatedUser
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Error al actualizar perfil'
        toast.error(message)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setUser]
  )

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true)
      const currentUser = await authApi.getMe()
      setUser(currentUser)
      return currentUser
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
    register,
    logout,
    updateProfile,
    fetchUser,
  }
}
