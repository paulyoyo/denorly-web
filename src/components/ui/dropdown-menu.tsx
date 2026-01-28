'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MoreVertical } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

export interface DropdownItem {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  destructive?: boolean
  disabled?: boolean
}

export interface DropdownMenuProps {
  items: DropdownItem[]
  trigger?: React.ReactNode
  align?: 'left' | 'right'
}

export function DropdownMenu({
  items,
  trigger,
  align = 'right',
}: DropdownMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className={cn(
          'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
        )}
      >
        {trigger || <MoreVertical className="h-5 w-5" />}
      </MenuButton>

      <MenuItems
        transition
        className={cn(
          'absolute z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5',
          'transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
          'focus:outline-none',
          align === 'left' ? 'left-0' : 'right-0'
        )}
      >
        <div className="py-1">
          {items.map((item, index) => (
            <MenuItem key={index} disabled={item.disabled}>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={cn(
                    'flex w-full min-h-[44px] items-center gap-3 px-4 py-2 text-left text-sm',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    focus && 'bg-gray-100',
                    item.destructive
                      ? 'text-red-600 hover:text-red-700'
                      : 'text-gray-700 hover:text-gray-900'
                  )}
                >
                  {item.icon && <span className="h-5 w-5">{item.icon}</span>}
                  {item.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
