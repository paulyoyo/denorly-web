'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateEmailTemplate } from '@/lib/hooks/use-email-templates'

import type { EmailTemplate } from '@/types/api'

interface EmailTemplateEditorProps {
  formId: string
  template: EmailTemplate
  onClose: () => void
}

const VARIABLES = [
  { name: '{{form_name}}', description: 'Nombre del formulario' },
  { name: '{{submission_data}}', description: 'Datos del envío' },
  { name: '{{sender_email}}', description: 'Email del remitente' },
  { name: '{{date}}', description: 'Fecha del envío' },
]

export function EmailTemplateEditor({
  formId,
  template,
  onClose,
}: EmailTemplateEditorProps) {
  const t = useTranslations('emails')
  const tCommon = useTranslations('common')
  const updateTemplate = useUpdateEmailTemplate(formId)

  const [enabled, setEnabled] = useState(template.enabled)
  const [subject, setSubject] = useState(template.subject)
  const [bodyHtml, setBodyHtml] = useState(template.bodyHtml)
  const [bodyText, setBodyText] = useState(template.bodyText || '')
  const [fromName, setFromName] = useState(template.fromName || '')
  const [replyTo, setReplyTo] = useState(template.replyTo || '')
  const [showVariables, setShowVariables] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const insertVariable = (variable: string) => {
    setBodyHtml((prev) => prev + variable)
    setShowVariables(false)
  }

  const handleSave = async () => {
    await updateTemplate.mutateAsync({
      templateId: template.id,
      data: {
        enabled,
        subject,
        bodyHtml,
        bodyText: bodyText || undefined,
        fromName: fromName || undefined,
        replyTo: replyTo || undefined,
      },
    })
    onClose()
  }

  return (
    <div className="space-y-4">
      <Checkbox
        label={t('enabled')}
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />

      <Input
        label={t('subject')}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Contenido HTML
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowVariables(true)}
              className="text-xs text-primary-600 hover:text-primary-700"
            >
              Variables
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="text-xs text-primary-600 hover:text-primary-700"
            >
              Vista previa
            </button>
          </div>
        </div>
        <Textarea
          value={bodyHtml}
          onChange={(e) => setBodyHtml(e.target.value)}
          rows={8}
        />
      </div>

      <details>
        <summary className="cursor-pointer text-sm font-medium text-gray-700">
          Texto plano (opcional)
        </summary>
        <Textarea
          className="mt-2"
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          rows={4}
        />
      </details>

      <Input
        label="Nombre del remitente"
        value={fromName}
        onChange={(e) => setFromName(e.target.value)}
        placeholder="Denorly"
      />

      <Input
        label="Reply-to"
        value={replyTo}
        onChange={(e) => setReplyTo(e.target.value)}
        placeholder="responder@ejemplo.com"
      />

      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onClose}>
          {tCommon('cancel')}
        </Button>
        <Button onClick={handleSave} isLoading={updateTemplate.isPending}>
          {tCommon('save')}
        </Button>
      </div>

      {/* Variables modal */}
      <Modal
        isOpen={showVariables}
        onClose={() => setShowVariables(false)}
        title="Variables disponibles"
      >
        <div className="space-y-2">
          {VARIABLES.map((v) => (
            <button
              key={v.name}
              type="button"
              onClick={() => insertVariable(v.name)}
              className="flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-gray-50"
            >
              <code className="text-sm font-medium text-primary-600">
                {v.name}
              </code>
              <span className="text-sm text-gray-500">{v.description}</span>
            </button>
          ))}
        </div>
      </Modal>

      {/* Preview modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Vista previa"
      >
        <div
          className="prose prose-sm max-w-none rounded-lg border border-gray-200 p-4"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </Modal>
    </div>
  )
}
