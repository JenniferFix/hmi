import React from 'react'
import { useGetWidget } from '@renderer/hooks/usewidgetqueries'
import Text from '@renderer/components/ScreenEditor/DefaultWidgets/Text'

const Widget = ({ widgetId }: { widgetId: string }) => {
  const { data, isLoading, isError, error } = useGetWidget({ id: widgetId })
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>WidgetError: {error?.message}</div>
  if (data === undefined) return <div>No Data</div>

  console.log('Widget', data)
  // GOAL: Render Widget.
  // Need to choose the specific component to render based on the widgetId and it's properties

  console.log(data.template.properties)
  return (
    <div
      key={data.id}
      className="border"
      style={{
        position: 'fixed',
        transform: `translate(${data.xPos}px, ${data.yPos}px)`
      }}
    >
      {data.template.name === 'Text' && <Text widgetId={widgetId} />}
    </div>
  )
}

export default Widget
