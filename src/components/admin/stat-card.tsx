import { Card, CardBody } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          </div>
          {icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              {icon}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
