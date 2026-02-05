'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, Webhook } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Select } from '@/components/ui/select'
import { PageSpinner } from '@/components/ui/spinner'
import {
  useCreateWebhook,
  useDeleteWebhook,
  useWebhooks,
} from '@/lib/hooks/use-webhooks'

const webhookSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  method: z.enum(['POST', 'GET', 'PUT', 'DELETE']),
})

export function WebhooksTab({ formId }) {
  const t = useTranslations('webhooks')
  const tCommon = useTranslations('common')
  const tValidation = useTranslations('validation')
  const { data: webhooks, isLoading } = useWebhooks(formId)
  const createWebhook = useCreateWebhook(formId)
  const deleteWebhook = useDeleteWebhook(formId)
  const [webhookToDelete, setWebhookToDelete] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(webhookSchema),
    defaultValues: {
      name: '',
      url: '',
      method: 'POST',
    },
  })

  const onCreateSubmit = async (data) => {
    await createWebhook.mutateAsync(data)
    setShowCreateModal(false)
    reset()
  }

  const openCreateModal = () => {
    reset()
    setShowCreateModal(true)
  }

  if (isLoading) return <PageSpinner />

  if (!webhooks || webhooks.length === 0) {
    return (
      <>
        <EmptyState
          icon={<Webhook className="h-8 w-8" />}
          title="No hay webhooks"
          description="Agrega un webhook para recibir notificaciones de envíos."
          action={{
            label: t('createWebhook'),
            onClick: openCreateModal,
          }}
        />

        {/* Create webhook modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title={t('createWebhook')}
        >
          <form onSubmit={handleSubmit(onCreateSubmit)} className="space-y-4">
            <Input
              {...register('name')}
              label={t('name')}
              error={errors.name && tValidation('required')}
            />
            <Input
              {...register('url')}
              label={t('url')}
              placeholder={t('urlPlaceholder')}
              error={errors.url && tValidation('url')}
            />
            <Select
              {...register('method')}
              label={t('method')}
              options={[
                { value: 'POST', label: 'POST' },
                { value: 'GET', label: 'GET' },
                { value: 'PUT', label: 'PUT' },
                { value: 'DELETE', label: 'DELETE' },
              ]}
              error={errors.method?.message}
            />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                {tCommon('cancel')}
              </Button>
              <Button type="submit" isLoading={createWebhook.isPending}>
                {tCommon('create')}
              </Button>
            </div>
          </form>
        </Modal>
      </>
    )
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          {t('createWebhook')}
        </Button>
      </div>

      <div className="space-y-3">
        {webhooks.map((webhook) => (
          <Card key={webhook.id}>
            <CardBody>
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-medium text-gray-900">
                      {webhook.name}
                    </h3>
                    <Badge variant="default" size="sm">
                      {webhook.method}
                    </Badge>
                    <Badge
                      variant={webhook.enabled ? 'success' : 'default'}
                      size="sm"
                    >
                      {webhook.enabled ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {webhook.url}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWebhookToDelete(webhook)}
                  className="ml-2 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!webhookToDelete}
        onClose={() => setWebhookToDelete(null)}
        title="Eliminar webhook"
      >
        <p className="text-sm text-gray-600">
          ¿Estás seguro de eliminar el webhook &quot;{webhookToDelete?.name}
          &quot;?
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setWebhookToDelete(null)}>
            {tCommon('cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              if (webhookToDelete) {
                await deleteWebhook.mutateAsync(webhookToDelete.id)
                setWebhookToDelete(null)
              }
            }}
            isLoading={deleteWebhook.isPending}
          >
            {tCommon('delete')}
          </Button>
        </div>
      </Modal>

      {/* Create webhook modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={t('createWebhook')}
      >
        <form onSubmit={handleSubmit(onCreateSubmit)} className="space-y-4">
          <Input
            {...register('name')}
            label={t('name')}
            error={errors.name && tValidation('required')}
          />
          <Input
            {...register('url')}
            label={t('url')}
            placeholder={t('urlPlaceholder')}
            error={errors.url && tValidation('url')}
          />
          <Select
            {...register('method')}
            label={t('method')}
            options={[
              { value: 'POST', label: 'POST' },
              { value: 'GET', label: 'GET' },
              { value: 'PUT', label: 'PUT' },
              { value: 'DELETE', label: 'DELETE' },
            ]}
            error={errors.method?.message}
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateModal(false)}
            >
              {tCommon('cancel')}
            </Button>
            <Button type="submit" isLoading={createWebhook.isPending}>
              {tCommon('create')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
