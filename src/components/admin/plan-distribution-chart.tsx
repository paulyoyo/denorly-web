'use client'

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { Card, CardBody, CardHeader } from '@/components/ui/card'

interface PlanDistributionChartProps {
  data: { name: string; value: number }[]
}

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444']

export function PlanDistributionChart({ data }: PlanDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-gray-900">Tenants por Plan</h3>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}
