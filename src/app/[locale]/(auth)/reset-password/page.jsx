'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resetPassword } from '@/lib/api/auth'
import { resetPasswordSchema } from '@/lib/validations/auth'
import { Link, useRouter } from '@/navigation'

export default function ResetPasswordPage() {
  const t = useTranslations('auth')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data) => {
    if (!token) {
      toast.error('Token inválido o expirado')
      return
    }

    try {
      setIsLoading(true)
      await resetPassword({ token, password: data.password })
      toast.success('Contraseña actualizada correctamente')
      router.push('/login')
    } catch {
      toast.error('Token inválido o expirado. Por favor, solicita uno nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="w-full text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Enlace inválido
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          El enlace para restablecer tu contraseña es inválido o ha expirado.
        </p>
        <Link
          href="/forgot-password"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Solicitar nuevo enlace
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        {t('resetPassword')}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('password')}
          type="password"
          label={t('password')}
          placeholder="••••••••"
          error={errors.password?.message}
          autoComplete="new-password"
        />

        <Input
          {...register('confirmPassword')}
          type="password"
          label={t('confirmPassword')}
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          {t('resetPassword')}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        <Link
          href="/login"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Volver al inicio de sesión
        </Link>
      </p>
    </div>
  )
}
