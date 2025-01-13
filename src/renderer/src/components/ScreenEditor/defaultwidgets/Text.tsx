import React from 'react'
import { useGetWidget } from '@renderer/hooks/usewidgetqueries'

const Text = ({ widgetId }: { widgetId: string }) => {
  const { data, isLoading, isError, error } = useGetWidget({ id: widgetId })
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>WidgetError: {error?.message}</div>
  if (data === undefined) return <div>No Data</div>

  /*
   * Text props
   * value: string
   * font: string
   * fontSize: number
   * color: string
   * background: string
   */

  const propTemplate = (propName: string) => {
    const out = data.template.properties.filter((prop) => prop.name === propName)
    return out[0]
  }

  const props = data.template.properties.reduce((acc, curr) => {
    const a = acc
    a[curr.name] = {
      id: curr.id,
      default: curr.default,
      name: curr.name,
      description: curr.description
    }
    return a
  }, {})

  const getProperty = (prop: string) => {
    // TODO: Finish getting the props
    // Just use the defautl value for now
    return props[prop].default
  }

  const getText = () => {}

  return <div>{getProperty('value')}</div>
}

export default Text
