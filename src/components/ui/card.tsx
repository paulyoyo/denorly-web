import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
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

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('border-b border-gray-200 px-4 py-4 md:px-6', className)}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn('px-4 py-4 md:px-6', className)}>{children}</div>
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        'border-t border-gray-200 px-4 py-4 md:px-6',
        className
      )}
    >
      {children}
    </div>
  )
}
