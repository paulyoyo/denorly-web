'use client'

import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import * as authApi from '@/lib/api/auth'
import { setAuthToken } from '@/lib/api/client'
import { useAuthStore } from '@/lib/stores/auth-store'

export function useAuth() {
  const { user, isAuthenticated, setUser, loginSuccess, logout: storeLogout } =
    useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(
    async (email, password) => {
      try {
        setIsLoading(true)
        const response = await authApi.login({ email, password })
        console.log('[AUTH] Login response:', { user: response.user?.email, token: response.token ? `${response.token.substring(0, 20)}...` : 'NULL' })
        setAuthToken(response.token)
        loginSuccess(response.user, response.token)
        console.log('[AUTH] After loginSuccess, localStorage:', localStorage.getItem('denorly-auth')?.substring(0, 100))
        return response
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Error al iniciar sesión'
        toast.error(message)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [loginSuccess]
  )

  const register = useCallback(async (data) => {
    try {
      setIsLoading(true)
      const response = await authApi.register(data)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al crear cuenta'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // Ignore logout API errors
    } finally {
      setAuthToken(null)
      storeLogout()
    }
  }, [storeLogout])

  const updateProfile = useCallback(
    async (data) => {
      try {
        setIsLoading(true)
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
        setIsLoading(false)
      }
    },
    [setUser]
  )

  const fetchUser = useCallback(async () => {
    try {
      const currentUser = await authApi.getMe()
      setUser(currentUser)
      return currentUser
    } catch {
      // Don't logout on error - let the caller handle it
      return null
    }
  }, [setUser])

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
