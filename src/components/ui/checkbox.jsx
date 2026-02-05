'use client'

import { forwardRef } from 'react'

import { cn } from '@/lib/utils/cn'

export const Checkbox = forwardRef(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id || props.name

    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            'text-primary-600 h-5 min-h-[20px] w-5 min-w-[20px] rounded border-gray-300 transition-colors',
            'focus:ring-primary-500 focus:ring-2 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
                className="cursor-pointer text-sm font-medium text-gray-900"
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-sm text-gray-500">{description}</span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
