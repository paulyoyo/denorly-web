'use client'

import { useTranslations } from 'next-intl'

import { FieldMapping } from '@/components/kommo/field-mapping'
import { PageHeader } from '@/components/layout/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { PageSpinner } from '@/components/ui/spinner'
import {
  useDisconnectKommo,
  useKommoAuthUrl,
  useKommoIntegration,
  useUpdateKommoIntegration,
} from '@/lib/hooks/use-kommo'

export default function KommoPage() {
  const t = useTranslations('kommo')
  const { data: integration, isLoading } = useKommoIntegration()
  const { refetch: fetchAuthUrl } = useKommoAuthUrl()
  const updateIntegration = useUpdateKommoIntegration()
  const disconnectKommo = useDisconnectKommo()

  const handleConnect = async () => {
    const { data: authUrl } = await fetchAuthUrl()
    if (authUrl) {
      window.open(authUrl, '_blank', 'width=600,height=700')
    }
  }

  if (isLoading) return <PageSpinner />

  // Not connected state
  if (!integration || !integration.connected) {
    return (
      <div>
        <PageHeader title={t('title')} />

        <Card className="mx-auto max-w-lg">
          <CardBody className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Conecta con Kommo CRM
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Sincroniza automáticamente los envíos de tus formularios con
              Kommo. Los contactos se crearán automáticamente en tu pipeline.
            </p>
            <Button onClick={handleConnect}>{t('connect')}</Button>
          </CardBody>
        </Card>
      </div>
    )
  }

  // Connected state
  return (
    <div>
      <PageHeader
        title={t('title')}
        actions={
          <Button
            variant="destructive"
            onClick={() => disconnectKommo.mutate()}
            isLoading={disconnectKommo.isPending}
          >
            {t('disconnect')}
          </Button>
        }
      />

      <div className="space-y-4">
        {/* Status */}
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Estado</span>
              <Badge variant="success">{t('connected')}</Badge>
            </div>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>Subdominio: {integration.subdomain}</p>
              {integration.lastSyncAt && (
                <p>Última sincronización: {integration.lastSyncAt}</p>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Field Mapping */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">
              Mapeo de campos
            </h2>
          </CardHeader>
          <CardBody>
            <FieldMapping
              mapping={integration.fieldMapping || {}}
              onChange={(fieldMapping) =>
                updateIntegration.mutate({ fieldMapping })
              }
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
