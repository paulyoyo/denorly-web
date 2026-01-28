'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateForm } from '@/lib/hooks/use-forms'
import {
  createFormSchema,
  type CreateFormFormData,
} from '@/lib/validations/forms'

import type { Form } from '@/types/api'

interface SettingsTabProps {
  form: Form
}

export function SettingsTab({ form }: SettingsTabProps) {
  const tCommon = useTranslations('common')
  const tForms = useTranslations('forms')
  const updateForm = useUpdateForm()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFormFormData>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: form.name,
      description: form.description || '',
      allowedDomains: form.allowedDomains?.join(', ') || '',
      redirectUrl: form.redirectUrl || '',
      successMessage: form.successMessage || '',
    },
  })

  useEffect(() => {
    reset({
      name: form.name,
      description: form.description || '',
      allowedDomains: form.allowedDomains?.join(', ') || '',
      redirectUrl: form.redirectUrl || '',
      successMessage: form.successMessage || '',
    })
  }, [form, reset])

  const onSubmit = async (data: CreateFormFormData) => {
    await updateForm.mutateAsync({
      id: form.id,
      data: {
        name: data.name,
        description: data.description || undefined,
        allowedDomains: data.allowedDomains
          ? data.allowedDomains
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
        {...register('allowedDomains')}
        label="Dominios permitidos (opcional)"
        error={errors.allowedDomains?.message}
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
