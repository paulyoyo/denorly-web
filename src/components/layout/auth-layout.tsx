import { Card, CardBody } from '@/components/ui/card'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      {/* Logo */}
      <div className="mb-8">
        <span className="text-3xl font-bold text-primary-600">Denorly</span>
      </div>

      {/* Card container */}
      <Card className="w-full max-w-md">
        <CardBody className="p-6 md:p-8">{children}</CardBody>
      </Card>
    </div>
  )
}
