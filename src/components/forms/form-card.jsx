'use client'

import { Check, Copy, Edit, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { DropdownMenu } from '@/components/ui/dropdown-menu'

export function FormCard({ form, onEdit, onDelete }) {
  const t = useTranslations('forms')
  const [copied, setCopied] = useState(false)

  const handleCopyEndpoint = async () => {
    try {
      await navigator.clipboard.writeText(form.endpointUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  const dropdownItems = [
    {
      label: t('edit'),
      icon: <Edit className="h-5 w-5" />,
      onClick: () => onEdit(form),
    },
    {
      label: t('copy'),
      icon: <Copy className="h-5 w-5" />,
      onClick: handleCopyEndpoint,
    },
    {
      label: 'Eliminar',
      icon: <Trash2 className="h-5 w-5" />,
      onClick: () => onDelete(form),
      destructive: true,
    },
  ]

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-gray-900">
              {form.name}
            </h3>
            {form.description && (
              <p className="mt-1 truncate text-sm text-gray-500">
                {form.description}
              </p>
            )}
          </div>
          <DropdownMenu items={dropdownItems} />
        </div>

        {/* Endpoint */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handleCopyEndpoint}
            className="group flex w-full items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-left"
          >
            <code className="flex-1 truncate text-xs text-gray-600">
              {form.endpointUrl}
            </code>
            {copied ? (
              <Check className="h-4 w-4 shrink-0 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-gray-600" />
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {form.submissionsCount} {t('submissions')}
          </span>
          <Badge variant={form.isActive ? 'success' : 'default'} size="sm">
            {form.isActive ? t('active') : t('inactive')}
          </Badge>
        </div>
      </CardBody>
    </Card>
  )
}
