'use client'

import { Plus, Trash2, Webhook } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Modal } from '@/components/ui/modal'
import { PageSpinner } from '@/components/ui/spinner'
import { useDeleteWebhook, useWebhooks } from '@/lib/hooks/use-webhooks'

import type { Webhook as WebhookType } from '@/types/api'

interface WebhooksTabProps {
  formId: string
}

export function WebhooksTab({ formId }: WebhooksTabProps) {
  const t = useTranslations('webhooks')
  const tCommon = useTranslations('common')
  const { data: webhooks, isLoading } = useWebhooks(formId)
  const deleteWebhook = useDeleteWebhook(formId)
  const [webhookToDelete, setWebhookToDelete] = useState<WebhookType | null>(
    null
  )

  if (isLoading) return <PageSpinner />

  if (!webhooks || webhooks.length === 0) {
    return (
      <EmptyState
        icon={<Webhook className="h-8 w-8" />}
        title="No hay webhooks"
        description="Agrega un webhook para recibir notificaciones de envíos."
        action={{
          label: t('createWebhook'),
          onClick: () => {
            // TODO: Open webhook form modal
          },
        }}
      />
    )
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button size="sm">
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
    </div>
  )
}
