'use client'

import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { use } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { PageSpinner } from '@/components/ui/spinner'
import { useAdminTenant } from '@/lib/hooks/use-admin-tenants'
import { Link } from '@/navigation'

interface AdminTenantDetailPageProps {
  params: Promise<{ id: string }>
}

export default function AdminTenantDetailPage({
  params,
}: AdminTenantDetailPageProps) {
  const { id } = use(params)
  const t = useTranslations('admin')
  const { data: tenant, isLoading } = useAdminTenant(id)

  if (isLoading || !tenant) return <PageSpinner />

  return (
    <div>
      <Link
        href="/admin/tenants"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('tenants')}
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900">{tenant.name}</h1>
        <Badge variant={tenant.status === 'active' ? 'success' : 'error'}>
          {tenant.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Información</h2>
          </CardHeader>
          <CardBody>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Email</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {tenant.email}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Plan</dt>
                <dd>
                  <Badge size="sm">{tenant.plan}</Badge>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Formularios</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {tenant.formsCount}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Envíos</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {tenant.submissionsCount}
                </dd>
              </div>
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Integraciones</h2>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Kommo</span>
              <Badge variant={tenant.hasKommo ? 'success' : 'default'}>
                {tenant.hasKommo ? 'Conectado' : 'No conectado'}
              </Badge>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
