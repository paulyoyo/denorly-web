'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAdminAuth } from '@/lib/hooks/use-admin-auth'
import { loginSchema } from '@/lib/validations/auth'
import { useRouter } from '@/navigation'

export default function AdminLoginPage() {
  const t = useTranslations('auth')
  const tAdmin = useTranslations('admin')
  const { login, isLoading } = useAdminAuth()
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
      router.push('/admin')
    } catch {
      // Handled by hook
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 py-12">
      <div className="mb-8 text-center">
        <span className="text-3xl font-bold text-white">Denorly</span>
        <span className="ml-2 rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white uppercase">
          Admin
        </span>
      </div>

      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl md:p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          {tAdmin('title')}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('email')}
            type="email"
            label={t('email')}
            placeholder="admin@denorly.com"
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

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {t('login')}
          </Button>
        </form>
      </div>
    </div>
  )
}
