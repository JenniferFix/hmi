import React from 'react'
import { useGetWidget } from './usewidgetqueries'
import * as z from 'zod'
import { database } from '@renderer/db'

const getZodProp = (strType: string) => {
  switch (strType) {
    case 'string':
      return z.string()
    case 'Number':
      return z.number()
    default:
      throw new Error(`Unknown type: ${strType}`)
  }
}

type TypeMap = {
  string: string
  number: number
  boolean: boolean
  Date: Date
}

function convert<T extends keyof TypeMap>(type: T, value: string): TypeMap[T] {
  switch (type) {
    case 'string':
      return value as TypeMap[T]
    case 'number':
      return Number(value) as TypeMap[T]
    case 'boolean':
      return (value === 'true') as TypeMap[T]
    case 'Date':
      return new Date(value) as TypeMap[T]
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

type Prop<T> = {
  propTemplateId: string
  defaultValue: T
  currentValue: T | null
}

function createProp<T extends keyof TypeMap>(
  dataType: T,
  defaultValue: string,
  propTemplateId: string
): Prop<TypeMap[T]> {
  const validTypes: (keyof TypeMap)[] = ['string', 'number', 'boolean', 'Date']
  if (!validTypes.includes(dataType)) {
    throw new Error(`Invalid type: ${dataType}`)
  }
  const defaultValueString = defaultValue == null ? '' : String(defaultValue)
  return {
    propTemplateId,
    defaultValue: convert<T>(dataType, defaultValueString),
    currentValue: null
  }
}

export function useWidgetProperties({ widgetId }: { widgetId: string }) {
  const { data, isLoading, isError, error } = useGetWidget({ id: widgetId })
  const [props, setProps] = React.useState<Prop<string | number | boolean>[] | null>(null)

  React.useEffect(() => {
    if (isLoading) return
    if (isError) return
    if (!data) return
    setProps(
      data.template.properties.map((templateProp) => {
        return createProp(
          templateProp.dataType.typescriptType as keyof TypeMap,
          templateProp.default,
          templateProp.id
        )
      })
    )
  }, [data, isLoading, isError, error])

  return { props }
}
