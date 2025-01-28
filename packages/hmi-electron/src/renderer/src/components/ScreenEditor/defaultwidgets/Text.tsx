import * as React from 'react'
import { useGetWidget } from '@renderer/hooks/usewidgetqueries'

const Text = React.memo(({ widgetId }: { widgetId: string }) => {
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
    acc = { ...acc }
    acc[curr.name] = {
      ...curr
    }
    return acc
  }, {})

  const templateId = (propName: string) => {
    const [found] = data.template.properties.filter((p) => p.name === propName)
    return found.id
  }

  const getProperty = (propName: string) => {
    const [val] = data.properties.filter((p) => p.propertyTemplateId === templateId(propName))
    if (val?.data) return val.data
    return props[propName].default
  }

  const getText = () => {}

  return <div>{getProperty('value')}</div>
  // return <div>tempText</div>
})

export default React.memo(Text)
