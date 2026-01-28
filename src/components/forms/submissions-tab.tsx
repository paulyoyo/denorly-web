'use client'

import { format } from 'date-fns'
import { Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { EmptyState } from '@/components/ui/empty-state'
import { Modal } from '@/components/ui/modal'
import { Pagination } from '@/components/ui/pagination'
import { PageSpinner } from '@/components/ui/spinner'
import { useSubmissions } from '@/lib/hooks/use-submissions'

import type { Submission } from '@/types/api'

interface SubmissionsTabProps {
  formId: string
}

export function SubmissionsTab({ formId }: SubmissionsTabProps) {
  const t = useTranslations('submissions')
  const [page, setPage] = useState(1)
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null)
  const { data, isLoading } = useSubmissions(formId, { page, limit: 10 })

  if (isLoading) return <PageSpinner />

  const submissions = data?.data || []
  const totalPages = data?.meta?.totalPages || 1

  if (submissions.length === 0) {
    return <EmptyState title={t('empty')} />
  }

  return (
    <div>
      {/* Mobile: card view */}
      <div className="space-y-3 md:hidden">
        {submissions.map((submission) => (
          <button
            key={submission.id}
            type="button"
            onClick={() => setSelectedSubmission(submission)}
            className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                {Object.values(submission.payload)[0] as string || 'Envío'}
              </span>
              <Eye className="h-4 w-4 text-gray-400" />
            </div>
            <span className="mt-1 block text-xs text-gray-500">
              {format(new Date(submission.createdAt), 'dd/MM/yyyy HH:mm')}
            </span>
          </button>
        ))}
      </div>

      {/* Desktop: table view */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">{t('payload')}</th>
              <th className="px-4 py-3">{t('receivedAt')}</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <code className="text-xs text-gray-700">
                    {JSON.stringify(submission.payload).slice(0, 80)}...
                  </code>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {format(new Date(submission.createdAt), 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedSubmission(submission)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Ver
                  </button>
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

      {/* Detail modal */}
      <Modal
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        title={t('payload')}
      >
        {selectedSubmission && (
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">
                {t('payload')}
              </h4>
              <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs text-gray-700">
                {JSON.stringify(selectedSubmission.payload, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">
                {t('metadata')}
              </h4>
              <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs text-gray-700">
                {JSON.stringify(selectedSubmission.metadata, null, 2)}
              </pre>
            </div>
            <p className="text-xs text-gray-500">
              {t('receivedAt')}:{' '}
              {format(
                new Date(selectedSubmission.createdAt),
                'dd/MM/yyyy HH:mm:ss'
              )}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}
