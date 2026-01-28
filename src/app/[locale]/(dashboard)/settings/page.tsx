'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useAuth } from '@/lib/hooks/use-auth'
import { useRouter } from '@/navigation'

export default function SettingsPage() {
  const t = useTranslations('settings')
  const { user, updateProfile, isLoading } = useAuth()
  const router = useRouter()

  const userName = user?.name || ''
  const userCompanyName = user?.companyName || ''
  const [name, setName] = useState(userName)
  const [companyName, setCompanyName] = useState(userCompanyName)
  const [language, setLanguage] = useState('es')

  // Sync initial values when user data arrives
  if (userName && !name) {
    setName(userName)
  }
  if (userCompanyName && !companyName) {
    setCompanyName(userCompanyName)
  }

  const handleSaveProfile = async () => {
    await updateProfile({ name, companyName })
  }

  const handleLanguageChange = (newLocale: string) => {
    setLanguage(newLocale)
    router.replace('/settings')
  }

  return (
    <div>
      <PageHeader title={t('title')} />

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">{t('profile')}</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Input
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Empresa"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Input
                label="Correo electrónico"
                value={user?.email || ''}
                disabled
              />
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} isLoading={isLoading}>
                  {t('updateProfile')}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Preferencias</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Select
                label="Idioma"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                options={[
                  { value: 'es', label: 'Español' },
                  { value: 'en', label: 'English' },
                ]}
              />
            </div>
          </CardBody>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Cuenta</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Plan actual</span>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                  Free
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Uso</span>
                  <span className="text-gray-900">0 / 100 envíos</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-primary-600"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
