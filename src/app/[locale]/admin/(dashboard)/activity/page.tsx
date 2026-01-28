'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { PageHeader } from '@/components/layout/page-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { Pagination } from '@/components/ui/pagination'
import { PageSpinner } from '@/components/ui/spinner'
import { adminApi } from '@/lib/api/admin-client'

import type { PaginatedResponse } from '@/types/api'

interface ActivityLog {
  id: string
  adminEmail: string
  action: string
  details?: Record<string, unknown>
  createdAt: string
}

const ACTION_LABELS: Record<string, string> = {
  'admin.login': 'Inicio de sesión',
  'tenant.suspend': 'Suspendió tenant',
  'tenant.reactivate': 'Reactivó tenant',
  'tenant.change_plan': 'Cambió plan',
  'tenant.delete': 'Eliminó tenant',
  'tenant.impersonate': 'Impersonó tenant',
  'admin.create': 'Creó admin',
  'admin.delete': 'Eliminó admin',
}

export default function AdminActivityPage() {
  const t = useTranslations('admin')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-activity', page],
    queryFn: async () => {
      const { data } = await adminApi.get<PaginatedResponse<ActivityLog>>(
        '/admin/activity',
        { params: { page, limit: 20 } }
      )
      return data
    },
  })

  if (isLoading) return <PageSpinner />

  const logs = data?.data || []
  const totalPages = data?.meta?.totalPages || 1

  return (
    <div>
      <PageHeader title={t('activity')} />

      <div className="space-y-3">
        {logs.map((log) => (
          <Card key={log.id}>
            <CardBody>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge size="sm">
                      {ACTION_LABELS[log.action] || log.action}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {log.adminEmail}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {format(new Date(log.createdAt), 'dd/MM/yyyy HH:mm')}
                </span>
              </div>

              {log.details && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-gray-500">
                    Detalles
                  </summary>
                  <pre className="mt-1 overflow-x-auto rounded bg-gray-50 p-2 text-xs text-gray-600">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                </details>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        className="mt-4"
      />
    </div>
  )
}
