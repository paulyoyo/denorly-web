'use client'

import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils/cn'

interface SubmissionsChartProps {
  data: { date: string; count: number }[]
}

const PERIODS = ['7d', '30d', '90d'] as const
type Period = (typeof PERIODS)[number]

export function SubmissionsChart({ data }: SubmissionsChartProps) {
  const [period, setPeriod] = useState<Period>('7d')

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-semibold text-gray-900">Submissions por Día</h3>
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
            {PERIODS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                  period === p
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}
