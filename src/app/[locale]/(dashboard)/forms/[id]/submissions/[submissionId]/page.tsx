'use client'

import { format } from 'date-fns'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { use, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { PageSpinner } from '@/components/ui/spinner'
import {
  useDeleteSubmission,
  useSubmission,
} from '@/lib/hooks/use-submissions'
import { Link, useRouter } from '@/navigation'

interface SubmissionDetailPageProps {
  params: Promise<{ id: string; submissionId: string }>
}

export default function SubmissionDetailPage({
  params,
}: SubmissionDetailPageProps) {
  const { id: formId, submissionId } = use(params)
  const t = useTranslations('submissions')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const { data: submission, isLoading } = useSubmission(formId, submissionId)
  const deleteSubmission = useDeleteSubmission(formId)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (isLoading || !submission) return <PageSpinner />

  const handleDelete = async () => {
    await deleteSubmission.mutateAsync(submissionId)
    router.push(`/forms/${formId}?tab=submissions`)
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Back link */}
      <Link
        href={`/forms/${formId}?tab=submissions`}
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {tCommon('back')}
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash2 className="h-4 w-4" />
          {tCommon('delete')}
        </Button>
      </div>

      {/* Payload */}
      <Card className="mb-4">
        <CardHeader>
          <h2 className="font-semibold text-gray-900">{t('payload')}</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {Object.entries(submission.payload).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col gap-1 border-b border-gray-100 pb-3 last:border-0 last:pb-0 sm:flex-row sm:gap-4"
              >
                <span className="min-w-[120px] text-sm font-medium text-gray-500">
                  {key}
                </span>
                <span className="text-sm text-gray-900">{String(value)}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Metadata */}
      <Card className="mb-4">
        <CardHeader>
          <h2 className="font-semibold text-gray-900">{t('metadata')}</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {submission.metadata.ip && (
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="min-w-[120px] text-sm font-medium text-gray-500">
                  IP
                </span>
                <span className="text-sm text-gray-900">
                  {submission.metadata.ip}
                </span>
              </div>
            )}
            {submission.metadata.userAgent && (
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="min-w-[120px] text-sm font-medium text-gray-500">
                  User Agent
                </span>
                <span className="break-all text-sm text-gray-900">
                  {submission.metadata.userAgent}
                </span>
              </div>
            )}
            {submission.metadata.referer && (
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="min-w-[120px] text-sm font-medium text-gray-500">
                  Referer
                </span>
                <span className="text-sm text-gray-900">
                  {submission.metadata.referer}
                </span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Received date */}
      <p className="text-sm text-gray-500">
        {t('receivedAt')}:{' '}
        {format(new Date(submission.createdAt), 'dd/MM/yyyy HH:mm:ss')}
      </p>

      {/* Delete confirmation */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Eliminar envío"
      >
        <p className="text-sm text-gray-600">
          ¿Estás seguro de que deseas eliminar este envío? Esta acción no se
          puede deshacer.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
            {tCommon('cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            isLoading={deleteSubmission.isPending}
          >
            {tCommon('delete')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
