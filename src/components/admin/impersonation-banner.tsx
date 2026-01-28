'use client'

import { X } from 'lucide-react'

interface ImpersonationBannerProps {
  email: string
  onExit: () => void
}

export function ImpersonationBanner({
  email,
  onExit,
}: ImpersonationBannerProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-yellow-500 px-4 py-2 text-sm font-medium text-yellow-900">
      <span>Impersonando a {email}</span>
      <button
        type="button"
        onClick={onExit}
        className="flex items-center gap-1 rounded bg-yellow-600 px-3 py-1 text-white hover:bg-yellow-700"
      >
        <X className="h-3 w-3" />
        Salir
      </button>
    </div>
  )
}
