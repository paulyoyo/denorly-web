'use client'

import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Link } from '@/navigation'

export function SubmissionModal({
  submission,
  formId,
  isOpen,
  onClose,
  onDelete,
}) {
  const t = useTranslations('submissions')
  const tCommon = useTranslations('common')

  if (!submission) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('payload')}>
      <div className="space-y-4">
        {/* Payload */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-700">
            {t('payload')}
          </h4>
          <div className="space-y-2">
            {Object.entries(submission.payload).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col gap-1 rounded-md bg-gray-50 px-3 py-2 sm:flex-row sm:items-center sm:gap-2"
              >
                <span className="text-xs font-medium text-gray-500">
                  {key}:
                </span>
                <span className="text-sm text-gray-900">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata (collapsible) */}
        <details>
          <summary className="cursor-pointer text-sm font-medium text-gray-700">
            {t('metadata')}
          </summary>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
            {JSON.stringify(submission.metadata, null, 2)}
          </pre>
        </details>

        {/* Date */}
        <p className="text-xs text-gray-500">
          {t('receivedAt')}:{' '}
          {format(new Date(submission.createdAt), 'dd/MM/yyyy HH:mm:ss')}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-between">
          <Link
            href={`/forms/${formId}/submissions/${submission.id}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Ver detalles completos
          </Link>
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(submission)}
            >
              {tCommon('delete')}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}
