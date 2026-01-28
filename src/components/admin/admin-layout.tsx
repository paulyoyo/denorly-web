'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import {
  Activity,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useAdminAuth } from '@/lib/hooks/use-admin-auth'
import { cn } from '@/lib/utils/cn'
import { Link, usePathname, useRouter } from '@/navigation'

import type { LucideIcon } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

interface NavLinksProps {
  navItems: NavItem[]
  pathname: string
  onNavigate?: () => void
}

function NavLinks({ navItems, pathname, onNavigate }: NavLinksProps) {
  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {navItems.map((item) => {
        const isActive =
          item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
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

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const t = useTranslations('admin')
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAdminAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isSuperAdmin = user?.role === 'super_admin'

  const navItems: NavItem[] = [
    { href: '/admin', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/admin/tenants', label: t('tenants'), icon: Users },
    ...(isSuperAdmin
      ? [{ href: '/admin/team', label: t('team'), icon: Users }]
      : []),
    { href: '/admin/activity', label: t('activity'), icon: Activity },
  ]

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu */}
      <Dialog
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        className="relative z-50 md:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-col bg-gray-800 transition duration-200 data-[closed]:-translate-x-full">
            <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">Denorly</span>
                <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                  Admin
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks
              navItems={navItems}
              pathname={pathname}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-gray-800 md:block">
        <div className="flex h-16 items-center gap-2 border-b border-gray-700 px-6">
          <span className="text-xl font-bold text-white">Denorly</span>
          <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
            Admin
          </span>
        </div>
        <NavLinks navItems={navItems} pathname={pathname} />
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-500 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden md:block" />
          <span className="text-sm text-gray-600">{user?.email}</span>
        </header>

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
