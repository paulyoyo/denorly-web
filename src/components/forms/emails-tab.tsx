'use client'

import { Mail, ToggleLeft, ToggleRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card, CardBody } from '@/components/ui/card'
import { PageSpinner } from '@/components/ui/spinner'
import {
  useEmailTemplates,
  useUpdateEmailTemplate,
} from '@/lib/hooks/use-email-templates'

import type { EmailTemplate } from '@/types/api'

interface EmailsTabProps {
  formId: string
}

export function EmailsTab({ formId }: EmailsTabProps) {
  const t = useTranslations('emails')
  const { data: templates, isLoading } = useEmailTemplates(formId)
  const updateTemplate = useUpdateEmailTemplate(formId)

  if (isLoading) return <PageSpinner />

  const ownerTemplate = templates?.find(
    (tpl) => tpl.type === 'owner_notification'
  )
  const visitorTemplate = templates?.find(
    (tpl) => tpl.type === 'visitor_autoresponse'
  )

  const handleToggle = (templateId: string, enabled: boolean) => {
    updateTemplate.mutate({
      templateId,
      data: { enabled: !enabled },
    })
  }

  const renderTemplateCard = (
    template: EmailTemplate | undefined,
    label: string
  ) => {
    if (!template) return null

    return (
      <Card>
        <CardBody>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{label}</h3>
                <p className="text-sm text-gray-500">
                  {t('subject')}: {template.subject || '—'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle(template.id, template.enabled)}
              className="text-gray-500 hover:text-gray-700"
            >
              {template.enabled ? (
                <ToggleRight className="h-8 w-8 text-primary-600" />
              ) : (
                <ToggleLeft className="h-8 w-8" />
              )}
            </button>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {renderTemplateCard(ownerTemplate, t('ownerNotification'))}
      {renderTemplateCard(visitorTemplate, t('visitorAutoresponse'))}
    </div>
  )
}
