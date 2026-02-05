'use client'

import { X } from 'lucide-react'

export function ImpersonationBanner({ email, onExit }) {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-yellow-500 px-4 py-2 text-sm font-medium text-yellow-900">
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
