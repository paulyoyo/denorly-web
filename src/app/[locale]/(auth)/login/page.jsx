'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/hooks/use-auth'
import { loginSchema } from '@/lib/validations/auth'
import { Link, useRouter } from '@/navigation'

export default function LoginPage() {
  const t = useTranslations('auth')
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
      router.push('/forms')
    } catch {
      // Error is handled by useAuth hook with toast
    }
  }

  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        {t('login')}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          autoComplete="current-password"
        />

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            {t('forgotPassword')}
          </Link>
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          {t('login')}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {t('noAccount')}{' '}
        <Link
          href="/register"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          {t('register')}
        </Link>
      </p>
    </div>
  )
}
