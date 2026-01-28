'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition-opacity data-[closed]:opacity-0"
      />

      {/* Full-screen container for positioning */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center md:items-center md:p-4">
          <DialogPanel
            transition
            className={cn(
              // Mobile: bottom sheet style
              'w-full rounded-t-2xl bg-white shadow-xl',
              'transition duration-200 ease-out data-[closed]:translate-y-full data-[closed]:opacity-0',
              // Desktop: centered modal
              'md:max-w-lg md:rounded-lg md:data-[closed]:translate-y-0 md:data-[closed]:scale-95',
              className
            )}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 md:px-6">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  {title}
                </DialogTitle>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="px-4 py-4 md:px-6">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
