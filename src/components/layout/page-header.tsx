import { cn } from '@/lib/utils/cn'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-col gap-2 sm:flex-row">{actions}</div>
      )}
    </div>
  )
}
