import { cn } from '@/lib/utils/cn'

export function Card({ children, className }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }) {
  return (
    <div
      className={cn('border-b border-gray-200 px-4 py-4 md:px-6', className)}
    >
      {children}
    </div>
  )
}

export function CardBody({ children, className }) {
  return <div className={cn('px-4 py-4 md:px-6', className)}>{children}</div>
}

export function CardFooter({ children, className }) {
  return (
    <div
      className={cn('border-t border-gray-200 px-4 py-4 md:px-6', className)}
    >
      {children}
    </div>
  )
}
