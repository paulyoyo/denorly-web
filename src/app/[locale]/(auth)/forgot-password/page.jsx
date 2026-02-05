'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { forgotPassword } from '@/lib/api/auth'
import { forgotPasswordSchema } from '@/lib/validations/auth'
import { Link } from '@/navigation'

export default function ForgotPasswordPage() {
  const t = useTranslations('auth')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      await forgotPassword(data.email)
      // Always show success for security (don't reveal if email exists)
      setSuccess(true)
    } catch {
      // Show success anyway for security
      setSuccess(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full text-center">
        <div className="mb-4 flex justify-center">
          <div className="bg-primary-100 text-primary-600 flex h-16 w-16 items-center justify-center rounded-full">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Revisa tu correo
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Si existe una cuenta con ese correo, recibirás instrucciones para
          restablecer tu contraseña.
        </p>
        <Link
          href="/login"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
        {t('forgotPassword')}
      </h1>
      <p className="mb-6 text-center text-sm text-gray-600">
        Ingresa tu correo y te enviaremos instrucciones para restablecer tu
        contraseña.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('email')}
          type="email"
          label={t('email')}
          placeholder="correo@ejemplo.com"
          error={errors.email?.message}
          autoComplete="email"
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Enviar instrucciones
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
