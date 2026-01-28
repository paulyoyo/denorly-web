'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateForm } from '@/lib/hooks/use-forms'
import {
  createFormSchema,
  type CreateFormFormData,
} from '@/lib/validations/forms'
import { useRouter } from '@/navigation'

export default function NewFormPage() {
  const t = useTranslations('forms')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const createForm = useCreateForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormFormData>({
    resolver: zodResolver(createFormSchema),
  })

  const onSubmit = async (data: CreateFormFormData) => {
    const formData = {
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
    }

    const result = await createForm.mutateAsync(formData)
    router.push(`/forms/${result.id}`)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {t('createForm')}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          {...register('name')}
          label={t('formName')}
          placeholder="Formulario de contacto"
          error={errors.name?.message}
        />

        <Textarea
          {...register('description')}
          label={`${t('description')} (opcional)`}
          placeholder="Describe el propósito de este formulario"
          error={errors.description?.message}
          rows={3}
        />

        <Input
          {...register('allowedDomains')}
          label="Dominios permitidos (opcional)"
          placeholder="ejemplo.com, otro-dominio.com"
          error={errors.allowedDomains?.message}
        />
        <p className="-mt-4 text-xs text-gray-500">
          Separa los dominios con comas. Deja vacío para permitir todos.
        </p>

        <Input
          {...register('redirectUrl')}
          label="URL de redirección (opcional)"
          placeholder="https://ejemplo.com/gracias"
          error={errors.redirectUrl?.message}
        />

        <Textarea
          {...register('successMessage')}
          label="Mensaje de éxito (opcional)"
          placeholder="¡Gracias por tu envío! Nos pondremos en contacto contigo."
          error={errors.successMessage?.message}
          rows={2}
        />
        <p className="-mt-4 text-xs text-gray-500">
          Se muestra si no se configura una URL de redirección.
        </p>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/forms')}
          >
            {tCommon('cancel')}
          </Button>
          <Button type="submit" isLoading={createForm.isPending}>
            {tCommon('create')}
          </Button>
        </div>
      </form>
    </div>
  )
}
