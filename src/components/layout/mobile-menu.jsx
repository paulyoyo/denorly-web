'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { X } from 'lucide-react'

import { Sidebar } from './sidebar'

export function MobileMenu({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 md:hidden">
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition-opacity data-[closed]:opacity-0"
      />

      {/* Slide-out panel */}
      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="relative flex w-full max-w-xs flex-col bg-white transition duration-200 ease-out data-[closed]:-translate-x-full"
        >
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
            <span className="text-primary-600 text-lg font-bold">Denorly</span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <Sidebar onNavigate={onClose} />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
