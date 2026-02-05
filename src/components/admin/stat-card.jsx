import { Card, CardBody } from '@/components/ui/card'

export function StatCard({ title, value, icon }) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          </div>
          {icon && (
            <div className="bg-primary-50 text-primary-600 flex h-12 w-12 items-center justify-center rounded-lg">
              {icon}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
