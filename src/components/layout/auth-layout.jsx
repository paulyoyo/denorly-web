import { Card, CardBody } from '@/components/ui/card'

export function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      {/* Logo */}
      <div className="mb-8">
        <span className="text-primary-600 text-3xl font-bold">Denorly</span>
      </div>

      {/* Card container */}
      <Card className="w-full max-w-md">
        <CardBody className="p-6 md:p-8">{children}</CardBody>
      </Card>
    </div>
  )
}
