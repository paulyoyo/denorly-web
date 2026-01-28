'use client'

import { Menu } from 'lucide-react'

import { UserMenu } from './user-menu'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Logo for mobile */}
      <span className="text-lg font-bold text-primary-600 md:hidden">
        Denorly
      </span>

      {/* Spacer for desktop */}
      <div className="hidden md:block" />

      {/* User menu */}
      <UserMenu />
    </header>
  )
}
