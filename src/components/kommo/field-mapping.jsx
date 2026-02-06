'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function FieldMapping({ mapping, onChange, isLoading }) {
  // Use array of [key, value] pairs with unique IDs for local state
  const [rows, setRows] = useState(() =>
    Object.entries(mapping || {}).map(([key, value], i) => ({
      id: i,
      key,
      value,
    }))
  )
  const [nextId, setNextId] = useState(Object.keys(mapping || {}).length)

  // Check if there are unsaved changes
  const currentMapping = rows.reduce((acc, { key, value }) => {
    if (key.trim()) acc[key] = value
    return acc
  }, {})
  const hasChanges = JSON.stringify(currentMapping) !== JSON.stringify(mapping || {})

  // Sync with prop changes (e.g., after save)
  useEffect(() => {
    const newRows = Object.entries(mapping || {}).map(([key, value], i) => ({
      id: i,
      key,
      value,
    }))
    setRows(newRows)
    setNextId(Object.keys(mapping || {}).length)
  }, [mapping])

  const addRow = () => {
    setRows([...rows, { id: nextId, key: '', value: '' }])
    setNextId(nextId + 1)
  }

  const updateKey = (id, newKey) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, key: newKey } : row)))
  }

  const updateValue = (id, newValue) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, value: newValue } : row)))
  }

  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleSave = () => {
    // Convert rows to object, filtering out empty keys
    const newMapping = rows.reduce((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value
      return acc
    }, {})
    onChange(newMapping)
  }

  return (
    <div className="space-y-3">
      <div className="hidden gap-4 text-xs font-medium text-gray-500 uppercase md:grid md:grid-cols-[1fr_1fr_40px]">
        <span>Campo del formulario</span>
        <span>Campo de Kommo</span>
        <span />
      </div>

      {rows.map(({ id, key, value }) => (
        <div
          key={id}
          className="flex flex-col gap-2 md:grid md:grid-cols-[1fr_1fr_40px] md:gap-4"
        >
          <Input
            value={key}
            onChange={(e) => updateKey(id, e.target.value)}
            placeholder="email"
          />

          <Input
            value={value}
            onChange={(e) => updateValue(id, e.target.value)}
            placeholder="EMAIL"
          />

          <button
            type="button"
            onClick={() => removeRow(id)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={addRow}>
          <Plus className="h-4 w-4" />
          Agregar campo
        </Button>

        {hasChanges && (
          <Button type="button" size="sm" onClick={handleSave} isLoading={isLoading}>
            <Save className="h-4 w-4" />
            Guardar
          </Button>
        )}
      </div>
    </div>
  )
}
