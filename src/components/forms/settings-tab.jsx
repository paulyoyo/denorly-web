'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateForm } from '@/lib/hooks/use-forms'
import { createFormSchema } from '@/lib/validations/forms'

export function SettingsTab({ form }) {
  const tCommon = useTranslations('common')
  const tForms = useTranslations('forms')
  const updateForm = useUpdateForm()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: form.name,
      description: form.description || '',
      allowedOrigins: form.allowedOrigins?.join(', ') || '',
      redirectUrl: form.redirectUrl || '',
      successMessage: form.successMessage || '',
    },
  })

  useEffect(() => {
    reset({
      name: form.name,
      description: form.description || '',
      allowedOrigins: form.allowedOrigins?.join(', ') || '',
      redirectUrl: form.redirectUrl || '',
      successMessage: form.successMessage || '',
    })
  }, [form, reset])

  const onSubmit = async (data) => {
    await updateForm.mutateAsync({
      id: form.id,
      data: {
        name: data.name,
        description: data.description || undefined,
        allowedOrigins: data.allowedOrigins
          ? data.allowedOrigins
              .split(',')
              .map((d) => d.trim())
              .filter(Boolean)
          : undefined,
        redirectUrl: data.redirectUrl || undefined,
        successMessage: data.successMessage || undefined,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <Input
        {...register('name')}
        label={tForms('formName')}
        error={errors.name?.message}
      />

      <Textarea
        {...register('description')}
        label={`${tForms('description')} (opcional)`}
        error={errors.description?.message}
        rows={3}
      />

      <Input
        {...register('allowedOrigins')}
        label="Dominios permitidos (opcional)"
        error={errors.allowedOrigins?.message}
      />

      <Input
        {...register('redirectUrl')}
        label="URL de redirección (opcional)"
        error={errors.redirectUrl?.message}
      />

      <Textarea
        {...register('successMessage')}
        label="Mensaje de éxito (opcional)"
        error={errors.successMessage?.message}
        rows={2}
      />

      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={updateForm.isPending}>
          {tCommon('save')}
        </Button>
      </div>
    </form>
  )
}
