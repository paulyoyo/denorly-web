'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/hooks/use-auth'
import { registerSchema } from '@/lib/validations/auth'
import { Link } from '@/navigation'

export default function RegisterPage() {
  const t = useTranslations('auth')
  const { register: registerUser, isLoading } = useAuth()
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
        companyName: data.companyName,
      })
      setSuccess(true)
    } catch {
      // Error is handled by useAuth hook with toast
    }
  }

  if (success) {
    return (
      <div className="w-full text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          ¡Cuenta creada!
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Te hemos enviado un correo de confirmación. Por favor, revisa tu
          bandeja de entrada.
        </p>
        <Link
          href="/login"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          {t('login')}
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        {t('register')}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('name')}
          type="text"
          label={t('name')}
          placeholder="Juan Pérez"
          error={errors.name?.message}
          autoComplete="name"
        />

        <Input
          {...register('email')}
          type="email"
          label={t('email')}
          placeholder="correo@ejemplo.com"
          error={errors.email?.message}
          autoComplete="email"
        />

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

        <Input
          {...register('companyName')}
          type="text"
          label={`${t('companyName')} (opcional)`}
          placeholder="Mi Empresa S.A."
          error={errors.companyName?.message}
          autoComplete="organization"
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          {t('register')}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {t('hasAccount')}{' '}
        <Link
          href="/login"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          {t('login')}
        </Link>
      </p>
    </div>
  )
}
