'use client'

import { Check, Copy } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { use, useState } from 'react'

import { EmailsTab } from '@/components/forms/emails-tab'
import { SettingsTab } from '@/components/forms/settings-tab'
import { SubmissionsTab } from '@/components/forms/submissions-tab'
import { WebhooksTab } from '@/components/forms/webhooks-tab'
import { Badge } from '@/components/ui/badge'
import { PageSpinner } from '@/components/ui/spinner'
import { useForm } from '@/lib/hooks/use-forms'
import { cn } from '@/lib/utils/cn'
import { useRouter } from '@/navigation'

const TABS = ['submissions', 'emails', 'webhooks', 'settings']

export default function FormDetailPage({ params }) {
  const { id } = use(params)
  const t = useTranslations('forms')
  const tSubmissions = useTranslations('submissions')
  const tEmails = useTranslations('emails')
  const tWebhooks = useTranslations('webhooks')
  const tSettings = useTranslations('settings')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: form, isLoading } = useForm(id)
  const [copied, setCopied] = useState(false)

  const currentTab = searchParams.get('tab') || 'submissions'

  const handleTabChange = (tab) => {
    router.replace(`/forms/${id}?tab=${tab}`)
  }

  const handleCopy = async () => {
    if (form) {
      await navigator.clipboard.writeText(form.endpointUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const tabLabels = {
    submissions: tSubmissions('title'),
    emails: tEmails('title'),
    webhooks: tWebhooks('title'),
    settings: tSettings('title'),
  }

  if (isLoading || !form) return <PageSpinner />

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{form.name}</h1>
              <Badge variant={form.isActive ? 'success' : 'default'} size="sm">
                {form.isActive ? t('active') : t('inactive')}
              </Badge>
            </div>
            {form.description && (
              <p className="mt-1 text-sm text-gray-500">{form.description}</p>
            )}
          </div>
        </div>

        {/* Endpoint */}
        <button
          type="button"
          onClick={handleCopy}
          className="mt-3 flex w-full items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-left md:w-auto"
        >
          <code className="flex-1 truncate text-xs text-gray-600 md:flex-none">
            {form.endpointUrl}
          </code>
          {copied ? (
            <Check className="h-4 w-4 shrink-0 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 shrink-0 text-gray-400" />
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="-mx-4 mb-6 overflow-x-auto border-b border-gray-200 px-4 md:mx-0 md:px-0">
        <nav className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={cn(
                'border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors',
                currentTab === tab
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {currentTab === 'submissions' && <SubmissionsTab formId={id} />}
      {currentTab === 'emails' && <EmailsTab formId={id} />}
      {currentTab === 'webhooks' && <WebhooksTab formId={id} />}
      {currentTab === 'settings' && <SettingsTab form={form} />}
    </div>
  )
}
