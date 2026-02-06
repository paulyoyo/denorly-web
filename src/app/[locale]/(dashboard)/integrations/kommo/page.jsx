'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FieldMapping } from '@/components/kommo/field-mapping'
import { PageHeader } from '@/components/layout/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PageSpinner } from '@/components/ui/spinner'
import {
  useConnectKommo,
  useDisconnectKommo,
  useKommoIntegration,
  useUpdateKommoIntegration,
} from '@/lib/hooks/use-kommo'

const kommoSchema = z.object({
  subdomain: z.string().min(1, 'Requerido'),
  accessToken: z.string().min(1, 'Requerido'),
})

export default function KommoPage() {
  const t = useTranslations('kommo')
  const { data: integration, isLoading } = useKommoIntegration()
  const connectKommo = useConnectKommo()
  const updateIntegration = useUpdateKommoIntegration()
  const disconnectKommo = useDisconnectKommo()
  const [showForm, setShowForm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(kommoSchema),
    defaultValues: {
      subdomain: '',
      accessToken: '',
    },
  })

  const onSubmit = async (data) => {
    await connectKommo.mutateAsync(data)
    setShowForm(false)
  }

  if (isLoading) return <PageSpinner />

  // Not connected state
  if (!integration || !integration.connected) {
    return (
      <div>
        <PageHeader title={t('title')} />

        <Card className="mx-auto max-w-xl">
          <CardBody>
            {!showForm ? (
              <div className="text-center">
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
                <Button onClick={() => setShowForm(true)}>{t('connect')}</Button>
              </div>
            ) : (
              <div>
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Configurar conexión con Kommo
                </h2>

                <div className="mb-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                  <p className="mb-2 font-medium">¿Cómo obtener tus credenciales?</p>
                  <ol className="ml-4 list-decimal space-y-1 text-blue-700">
                    <li>Ve a tu cuenta de Kommo</li>
                    <li>Configuración → Integraciones</li>
                    <li>Crea una nueva integración privada</li>
                    <li>Copia el subdominio y el token de acceso</li>
                  </ol>
                  <a
                    href="https://www.kommo.com/support/integrations/private-integrations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
                  >
                    Ver documentación
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input
                      {...register('subdomain')}
                      label="Subdominio de Kommo"
                      placeholder="tu-empresa"
                      error={errors.subdomain?.message}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      El subdominio de tu cuenta (ej: si tu URL es{' '}
                      <strong>tu-empresa.kommo.com</strong>, ingresa{' '}
                      <strong>tu-empresa</strong>)
                    </p>
                  </div>

                  <div>
                    <Input
                      {...register('accessToken')}
                      type="password"
                      label="Token de acceso"
                      placeholder="Tu token de acceso de larga duración"
                      error={errors.accessToken?.message}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      El token de acceso de larga duración de tu integración privada
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      isLoading={connectKommo.isPending}
                      className="flex-1"
                    >
                      Conectar
                    </Button>
                  </div>
                </form>
              </div>
            )}
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
            <h2 className="font-semibold text-gray-900">Mapeo de campos</h2>
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
