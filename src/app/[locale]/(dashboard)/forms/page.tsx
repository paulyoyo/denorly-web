'use client'

import { FileText, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { FormCard } from '@/components/forms/form-card'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Modal } from '@/components/ui/modal'
import { PageSpinner } from '@/components/ui/spinner'
import { useDeleteForm, useForms } from '@/lib/hooks/use-forms'
import { useRouter } from '@/navigation'

import type { Form } from '@/types/api'

export default function FormsPage() {
  const t = useTranslations('forms')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const { data, isLoading } = useForms()
  const deleteForm = useDeleteForm()
  const [formToDelete, setFormToDelete] = useState<Form | null>(null)

  const handleEdit = (form: Form) => {
    router.push(`/forms/${form.id}?tab=settings`)
  }

  const handleDelete = (form: Form) => {
    setFormToDelete(form)
  }

  const confirmDelete = async () => {
    if (!formToDelete) return
    await deleteForm.mutateAsync(formToDelete.id)
    setFormToDelete(null)
  }

  if (isLoading) {
    return <PageSpinner />
  }

  const forms = data?.data || []

  return (
    <div>
      <PageHeader
        title={t('title')}
        actions={
          <Button onClick={() => router.push('/forms/new')}>
            <Plus className="h-5 w-5" />
            {t('createForm')}
          </Button>
        }
      />

      {forms.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-8 w-8" />}
          title={t('noForms')}
          description={t('createFirst')}
          action={{
            label: t('createForm'),
            onClick: () => router.push('/forms/new'),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <FormCard
              key={form.id}
              form={form}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!formToDelete}
        onClose={() => setFormToDelete(null)}
        title="Eliminar formulario"
      >
        <p className="text-sm text-gray-600">
          ¿Estás seguro de que deseas eliminar el formulario &quot;
          {formToDelete?.name}&quot;? Esta acción no se puede deshacer.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setFormToDelete(null)}>
            {tCommon('cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={confirmDelete}
            isLoading={deleteForm.isPending}
          >
            {tCommon('delete')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
