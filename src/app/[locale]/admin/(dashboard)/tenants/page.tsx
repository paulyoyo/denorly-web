'use client'

import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { PageHeader } from '@/components/layout/page-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'
import { PageSpinner } from '@/components/ui/spinner'
import { useAdminTenants } from '@/lib/hooks/use-admin-tenants'
import { useRouter } from '@/navigation'

export default function AdminTenantsPage() {
  const t = useTranslations('admin')
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useAdminTenants({ search, page, limit: 20 })

  if (isLoading) return <PageSpinner />

  const tenants = data?.data || []
  const totalPages = data?.meta?.totalPages || 1

  return (
    <div>
      <PageHeader title={t('tenants')} />

      {/* Search */}
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar tenants..."
          className="pl-10"
        />
      </div>

      {/* Mobile: cards / Desktop: table */}
      <div className="space-y-3 md:hidden">
        {tenants.map((tenant) => (
          <Card key={tenant.id}>
            <CardBody>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">{tenant.name}</p>
                  <p className="text-sm text-gray-500">{tenant.email}</p>
                  <div className="mt-2 flex gap-2">
                    <Badge size="sm">{tenant.plan}</Badge>
                    <Badge
                      size="sm"
                      variant={
                        tenant.status === 'active' ? 'success' : 'error'
                      }
                    >
                      {tenant.status}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu
                  items={[
                    {
                      label: 'Ver detalles',
                      onClick: () =>
                        router.push(`/admin/tenants/${tenant.id}`),
                    },
                    {
                      label: 'Impersonar',
                      onClick: () => {
                        // TODO: impersonation
                      },
                    },
                  ]}
                />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Forms</th>
              <th className="px-4 py-3">Envíos</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {tenant.name}
                </td>
                <td className="px-4 py-3 text-gray-500">{tenant.email}</td>
                <td className="px-4 py-3">
                  <Badge size="sm">{tenant.plan}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    size="sm"
                    variant={tenant.status === 'active' ? 'success' : 'error'}
                  >
                    {tenant.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">{tenant.formsCount}</td>
                <td className="px-4 py-3">{tenant.submissionsCount}</td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu
                    items={[
                      {
                        label: 'Ver detalles',
                        onClick: () =>
                          router.push(`/admin/tenants/${tenant.id}`),
                      },
                      {
                        label: 'Impersonar',
                        onClick: () => {
                          // TODO: impersonation
                        },
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
