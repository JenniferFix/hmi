import React from 'react'
import { useGetWidget } from './usewidgetqueries'
import * as z from 'zod'

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

export function useWidgetProperties({ widgetId }: { widgetId: string }) {
  const widget = useGetWidget({ id: widgetId })

  React.useEffect(() => {
    if (widget.isLoading) return
    if (widget.isError) throw new Error(`Widget error ${widget.error?.message}`)
    if (!widget.data) throw new Error(`No Widget Data`)

    // Goal: loop through template props with the data types and create a type safe object of the props
    // create zod schema
    // infer type from schema
    const zodObject = {}
    widget.data.template.properties.forEach((pt) => {
      zodObject[pt.name] = getZodProp(pt.dataType.typescriptType || '')
    })
    const widgetSchema = z.object(zodObject)
    type WidgetProps = z.infer<typeof widgetSchema>
  }, [widget])

  const getProperty = (propName: string, propertyTemplateId: string) => {
    if (widget.isLoading) return
    if (widget.isError) throw new Error(`Widget error ${widget.error?.message}`)
    if (!widget.data) throw new Error(`No Widget Data`)
    const [val] = widget.data.properties.filter((p) => p.propertyTemplateId === propertyTemplateId)
    if (val?.data) return val.data
    return props[propName].default
  }

  return { props }
}
