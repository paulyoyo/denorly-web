'use client'

import { Plus, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { PageHeader } from '@/components/layout/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardBody } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { PageSpinner } from '@/components/ui/spinner'
import { useAdminAuth } from '@/lib/hooks/use-admin-auth'
import { useAdminUsers, useDeleteAdminUser } from '@/lib/hooks/use-admin-users'
import { useRouter } from '@/navigation'

export default function AdminTeamPage() {
  const t = useTranslations('admin')
  const tCommon = useTranslations('common')
  const { user: currentUser } = useAdminAuth()
  const router = useRouter()
  const { data: users, isLoading } = useAdminUsers()
  const deleteUser = useDeleteAdminUser()
  const [userToDelete, setUserToDelete] = useState(null)

  // Check if super_admin
  useEffect(() => {
    if (currentUser && currentUser.role !== 'super_admin') {
      router.replace('/admin')
    }
  }, [currentUser, router])

  if (isLoading) return <PageSpinner />

  const canDelete = (user) => {
    // Cannot delete self
    if (user.id === currentUser?.id) return false
    // Cannot delete last super_admin
    const superAdmins = users?.filter((u) => u.role === 'super_admin') || []
    if (user.role === 'super_admin' && superAdmins.length <= 1) return false
    return true
  }

  return (
    <div>
      <PageHeader
        title={t('team')}
        actions={
          <Button>
            <Plus className="h-5 w-5" />
            Crear admin
          </Button>
        }
      />

      <div className="space-y-3">
        {users?.map((user) => (
          <Card key={user.id}>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <Badge
                      size="sm"
                      variant={
                        user.role === 'super_admin' ? 'warning' : 'default'
                      }
                    >
                      {user.role}
                    </Badge>
                    {user.id === currentUser?.id && (
                      <Badge size="sm" variant="success">
                        Tú
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                {canDelete(user) && (
                  <button
                    type="button"
                    onClick={() => setUserToDelete(user)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        title="Eliminar admin"
      >
        <p className="text-sm text-gray-600">
          ¿Estás seguro de eliminar a &quot;{userToDelete?.name}&quot;?
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setUserToDelete(null)}>
            {tCommon('cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              if (userToDelete) {
                await deleteUser.mutateAsync(userToDelete.id)
                setUserToDelete(null)
              }
            }}
            isLoading={deleteUser.isPending}
          >
            {tCommon('delete')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
