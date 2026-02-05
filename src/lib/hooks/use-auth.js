'use client'

import { useCallback } from 'react'
import toast from 'react-hot-toast'

import * as authApi from '@/lib/api/auth'
import { setAuthToken } from '@/lib/api/client'
import { useAuthStore } from '@/lib/stores/auth-store'

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
    async (email, password) => {
      try {
        setLoading(true)
        const response = await authApi.login({ email, password })
        console.log(
          '[AUTH] Login response token:',
          response.token ? `${response.token.substring(0, 20)}...` : 'NULL'
        )
        setAuthToken(response.token)
        loginSuccess(response.user, response.token)
        console.log(
          '[AUTH] Token set. localStorage:',
          localStorage.getItem('denorly-auth')?.substring(0, 80)
        )
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
    async (data) => {
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
      setAuthToken(null)
      storeLogout()
    }
  }, [storeLogout])

  const updateProfile = useCallback(
    async (data) => {
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
