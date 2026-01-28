'use client'

import { Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FieldMappingProps {
  mapping: Record<string, string>
  onChange: (mapping: Record<string, string>) => void
}

export function FieldMapping({ mapping, onChange }: FieldMappingProps) {
  const entries = Object.entries(mapping)

  const addRow = () => {
    onChange({ ...mapping, '': '' })
  }

  const updateKey = (oldKey: string, newKey: string, index: number) => {
    const newMapping: Record<string, string> = {}
    entries.forEach(([k, v], i) => {
      if (i === index) {
        newMapping[newKey] = v
      } else {
        newMapping[k] = v
      }
    })
    onChange(newMapping)
  }

  const updateValue = (key: string, value: string) => {
    onChange({ ...mapping, [key]: value })
  }

  const removeRow = (key: string) => {
    const newMapping = { ...mapping }
    delete newMapping[key]
    onChange(newMapping)
  }

  return (
    <div className="space-y-3">
      <div className="hidden gap-4 text-xs font-medium uppercase text-gray-500 md:grid md:grid-cols-[1fr_1fr_40px]">
        <span>Campo del formulario</span>
        <span>Campo de Kommo</span>
        <span />
      </div>

      {entries.map(([key, value], index) => (
        <div key={index} className="flex flex-col gap-2 md:grid md:grid-cols-[1fr_1fr_40px] md:gap-4">
          <Input
            value={key}
            onChange={(e) => updateKey(key, e.target.value, index)}
            placeholder="email"
          />
          <Input
            value={value}
            onChange={(e) => updateValue(key, e.target.value)}
            placeholder="EMAIL"
          />
          <button
            type="button"
            onClick={() => removeRow(key)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      <Button type="button" variant="outline" size="sm" onClick={addRow}>
        <Plus className="h-4 w-4" />
        Agregar campo
      </Button>
    </div>
  )
}
