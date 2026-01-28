'use client'

import { forwardRef } from 'react'

import { cn } from '@/lib/utils/cn'

import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id || props.name

    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            'h-5 w-5 min-h-[20px] min-w-[20px] rounded border-gray-300 text-primary-600 transition-colors',
            'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
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
                className="text-sm font-medium text-gray-900 cursor-pointer"
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
