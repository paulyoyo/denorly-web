import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

const sizeStyles = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

export function Spinner({ size = 'md', className }) {
  return (
    <Loader2
      className={cn(
        'text-primary-600 animate-spin',
        sizeStyles[size],
        className
      )}
    />
  )
}

export function PageSpinner() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}
