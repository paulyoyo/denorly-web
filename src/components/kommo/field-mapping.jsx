'use client'

import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'

export function FieldMapping({
  mapping,
  onChange,
  isLoading,
  availableFields = [],
  kommoFields = [],
}) {
  // Use array of [key, value] pairs with unique IDs for local state
  const [rows, setRows] = useState(() =>
    Object.entries(mapping || {}).map(([key, value], i) => ({
      id: i,
      key,
      value: typeof value === 'object' ? value : { field_id: 0, field_name: value },
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
      value: typeof value === 'object' ? value : { field_id: 0, field_name: value },
    }))
    setRows(newRows)
    setNextId(Object.keys(mapping || {}).length)
  }, [mapping])

  const addRow = () => {
    setRows([...rows, { id: nextId, key: '', value: { field_id: 0, field_name: '' } }])
    setNextId(nextId + 1)
  }

  const updateKey = (id, newKey) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, key: newKey } : row)))
  }

  const updateValue = (id, kommoFieldId) => {
    const selectedField = kommoFields.find((f) => f.id === parseInt(kommoFieldId, 10))
    const newValue = selectedField
      ? {
          field_id: selectedField.id,
          field_name: selectedField.name,
          field_type: selectedField.type,
          field_code: selectedField.code,
          entity_type: selectedField.entity_type, // 'leads' or 'contacts'
        }
      : { field_id: 0, field_name: '' }
    setRows(rows.map((row) => (row.id === id ? { ...row, value: newValue } : row)))
  }

  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleSave = () => {
    // Convert rows to object, filtering out empty keys
    const newMapping = rows.reduce((acc, { key, value }) => {
      if (key.trim() && value.field_id) acc[key.trim()] = value
      return acc
    }, {})
    onChange(newMapping)
  }

  // Build Kommo field options for dropdown
  const kommoFieldOptions = kommoFields.map((field) => ({
    value: field.id.toString(),
    label: `${field.name} (${field.code || field.type})`,
  }))

  return (
    <div className="space-y-3">
      <div className="hidden gap-4 text-xs font-medium text-gray-500 uppercase md:grid md:grid-cols-[1fr_1fr_40px]">
        <span>Campo del formulario</span>
        <span>Campo de Kommo</span>
        <span />
      </div>

      {rows.map(({ id, key, value }) => {
        // Get fields that are not already used (except current row's field)
        const usedFields = rows.filter((r) => r.id !== id).map((r) => r.key)
        const fieldOptions = availableFields
          .filter((field) => !usedFields.includes(field))
          .map((field) => ({ value: field, label: field }))

        // Get Kommo fields that are not already used (except current row's field)
        const usedKommoFields = rows
          .filter((r) => r.id !== id)
          .map((r) => r.value?.field_id)
          .filter(Boolean)
        const availableKommoOptions = kommoFieldOptions.filter(
          (opt) => !usedKommoFields.includes(parseInt(opt.value, 10))
        )

        return (
          <div
            key={id}
            className="flex flex-col gap-2 md:grid md:grid-cols-[1fr_1fr_40px] md:gap-4"
          >
            <Select
              value={key}
              onChange={(e) => updateKey(id, e.target.value)}
              placeholder="Seleccionar campo"
              options={fieldOptions}
            />

            <Select
              value={value?.field_id?.toString() || ''}
              onChange={(e) => updateValue(id, e.target.value)}
              placeholder="Seleccionar campo de Kommo"
              options={availableKommoOptions}
            />

            <button
              type="button"
              onClick={() => removeRow(id)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )
      })}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRow}
          disabled={rows.length >= availableFields.length || kommoFields.length === 0}
        >
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

      {availableFields.length === 0 && (
        <p className="text-sm text-gray-500">
          No hay campos de formulario disponibles. Los campos aparecerán después de recibir envíos en tus formularios.
        </p>
      )}

      {kommoFields.length === 0 && (
        <p className="text-sm text-gray-500">
          No hay campos de Kommo disponibles. Asegúrate de que la integración esté conectada.
        </p>
      )}
    </div>
  )
}
