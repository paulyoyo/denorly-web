'use client'

import { LogOut, Settings, User } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/hooks/use-auth'
import { useRouter } from '@/navigation'

export function UserMenu() {
  const t = useTranslations('auth')
  const tSettings = useTranslations('settings')
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const items = [
    {
      label: tSettings('title'),
      icon: <Settings className="h-5 w-5" />,
      onClick: () => router.push('/settings'),
    },
    {
      label: t('logout'),
      icon: <LogOut className="h-5 w-5" />,
      onClick: handleLogout,
      destructive: true,
    },
  ]

  return (
    <DropdownMenu
      items={items}
      trigger={
        <div className="flex items-center gap-2">
          <div className="bg-primary-100 text-primary-700 flex h-8 w-8 items-center justify-center rounded-full">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden text-sm font-medium text-gray-700 md:block">
            {user?.email}
          </span>
        </div>
      }
    />
  )
}
