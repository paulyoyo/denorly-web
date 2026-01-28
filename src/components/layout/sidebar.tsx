'use client'

import { FileText, Plug, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils/cn'
import { Link, usePathname } from '@/navigation'

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const t = useTranslations('forms')
  const tKommo = useTranslations('kommo')
  const tSettings = useTranslations('settings')
  const pathname = usePathname()

  const navItems = [
    {
      href: '/forms',
      label: t('title'),
      icon: FileText,
    },
    {
      href: '/integrations',
      label: tKommo('title'),
      icon: Plug,
    },
    {
      href: '/settings',
      label: tSettings('title'),
      icon: Settings,
    },
  ]

  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
