'use client'

import { format } from 'date-fns'
import { Calendar, Clock, Eye, Globe, Mail, Phone, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { EmptyState } from '@/components/ui/empty-state'
import { Modal } from '@/components/ui/modal'
import { Pagination } from '@/components/ui/pagination'
import { PageSpinner } from '@/components/ui/spinner'
import { useSubmissions } from '@/lib/hooks/use-submissions'

// Get an icon based on field name
function getFieldIcon(key) {
  const lowerKey = key.toLowerCase()
  if (lowerKey.includes('email')) return Mail
  if (lowerKey.includes('phone') || lowerKey.includes('tel')) return Phone
  if (lowerKey.includes('name') || lowerKey.includes('nombre')) return User
  if (lowerKey.includes('date') || lowerKey.includes('fecha')) return Calendar
  if (lowerKey.includes('time') || lowerKey.includes('hora')) return Clock
  if (lowerKey.includes('url') || lowerKey.includes('web')) return Globe
  return null
}

// Format field name for display
function formatFieldName(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim()
}

// Render a value based on its type
function renderValue(value) {
  if (value === null || value === undefined) {
    return <span className="text-gray-400 italic">—</span>
  }
  if (typeof value === 'boolean') {
    return (
      <span
        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
          value
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        {value ? 'Sí' : 'No'}
      </span>
    )
  }
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-1">
        {value.map((item, i) => (
          <span
            key={i}
            className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
          >
            {String(item)}
          </span>
        ))}
      </div>
    )
  }
  if (typeof value === 'object') {
    return (
      <pre className="rounded bg-gray-50 p-2 text-xs text-gray-600">
        {JSON.stringify(value, null, 2)}
      </pre>
    )
  }
  // Check if it's a URL
  if (typeof value === 'string' && value.match(/^https?:\/\//)) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 hover:text-primary-700 break-all underline"
      >
        {value}
      </a>
    )
  }
  // Check if it's an email
  if (typeof value === 'string' && value.includes('@') && value.includes('.')) {
    return (
      <a
        href={`mailto:${value}`}
        className="text-primary-600 hover:text-primary-700 break-all underline"
      >
        {value}
      </a>
    )
  }
  return <span className="break-words text-gray-900">{String(value)}</span>
}

// Data field component
function DataField({ label, value }) {
  const Icon = getFieldIcon(label)

  return (
    <div className="flex flex-col gap-1 rounded-lg border border-gray-100 bg-white p-3">
      <dt className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {formatFieldName(label)}
      </dt>
      <dd className="text-sm">{renderValue(value)}</dd>
    </div>
  )
}

// Get preview text for submission
function getPreviewText(payload) {
  if (!payload || typeof payload !== 'object') return 'Envío'
  const values = Object.values(payload)
  const firstString = values.find((v) => typeof v === 'string' && v.length > 0)
  if (firstString) return firstString.slice(0, 50) + (firstString.length > 50 ? '...' : '')
  return 'Envío'
}

export function SubmissionsTab({ formId }) {
  const t = useTranslations('submissions')
  const [page, setPage] = useState(1)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
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
                {getPreviewText(submission.payload)}
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
          <thead className="border-b border-gray-200 text-xs text-gray-500 uppercase">
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
                  <span className="text-sm text-gray-700">
                    {getPreviewText(submission.payload)}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {format(new Date(submission.createdAt), 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedSubmission(submission)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Ver detalles
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
        title="Detalles del envío"
      >
        {selectedSubmission && (
          <div className="space-y-6">
            {/* Submission data */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                {t('payload')}
              </h4>
              <dl className="grid gap-2 sm:grid-cols-2">
                {Object.entries(selectedSubmission.payload || {}).map(
                  ([key, value]) => (
                    <DataField key={key} label={key} value={value} />
                  )
                )}
              </dl>
            </div>

            {/* Metadata */}
            {selectedSubmission.metadata &&
              Object.keys(selectedSubmission.metadata).length > 0 && (
                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                    {t('metadata')}
                  </h4>
                  <dl className="grid gap-2 sm:grid-cols-2">
                    {Object.entries(selectedSubmission.metadata).map(
                      ([key, value]) => (
                        <DataField key={key} label={key} value={value} />
                      )
                    )}
                  </dl>
                </div>
              )}

            {/* Timestamp */}
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              {t('receivedAt')}:{' '}
              <span className="font-medium text-gray-900">
                {format(
                  new Date(selectedSubmission.createdAt),
                  'dd/MM/yyyy HH:mm:ss'
                )}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
