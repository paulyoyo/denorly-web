'use client'

import { forwardRef } from 'react'

import { cn } from '@/lib/utils/cn'

export const Textarea = forwardRef(
  ({ className, label, error, id, rows = 4, ...props }, ref) => {
    const textareaId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'block w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-colors',
            'focus:border-primary-500 focus:ring-primary-500 focus:ring-1 focus:outline-none',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />

        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
