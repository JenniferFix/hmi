import React from 'react'
import { useGetWidget } from '@renderer/hooks/usewidgetqueries'

const Text = ({ widgetId }: { widgetId: string }) => {
  const { data, isLoading, isError, error } = useGetWidget({ id: widgetId })
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>WidgetError: {error?.message}</div>
  if (data === undefined) return <div>No Data</div>

  const getTemplateName = (propName: string) => {
    const out = data.template.properties.filter((prop) => prop.name === propName)
    console.log(out)
    return out
  }
  console.log('Text', getTemplateName('value'))
  const getText = () => {}

  // return <div>{getTemplateName('value')}</div>
  return <div>Text</div>
}

export default Text
