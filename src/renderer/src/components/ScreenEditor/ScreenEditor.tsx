import React from 'react'
import { useGetScreen } from '@renderer/hooks/usescreensqueries'
import { useGetScreenWidgets, useAddWidgetToScreen } from '@renderer/hooks/usewidgetqueries'
import Widget from '@renderer/components/ScreenEditor/Widget'

const Screen = ({ screenId }: { screenId: string }) => {
  const {
    data: screenData,
    isLoading: screenIsLoading,
    isError: screenIsError,
    error: screenError
  } = useGetScreen({ id: screenId })
  const {
    data: widgetData,
    isLoading: widgetIsLoading,
    isError: widgetIsError,
    error: widgetError
  } = useGetScreenWidgets({ screenId })
  const addWidget = useAddWidgetToScreen()
  if (screenIsLoading || widgetIsLoading) return <div>loading...</div>
  if (screenIsError || widgetIsError)
    return (
      <div>
        Error: {screenError?.message}
        {widgetError?.message}
      </div>
    )

  const handleDragOver: React.DragEventHandler<HTMLElement> = (e) => {
    // console.log('dragOver', e)
  }
  const handleDrop: React.DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault()
    const dropData = JSON.parse(e.dataTransfer.getData('application/json'))
    console.log('drop', e)

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    addWidget.mutate({ screenId, widgetTemplateId: dropData.id, xPos: x, yPos: y })
  }
  return (
    <div className="absolute inset-0 bg-purple-50" onDragOver={handleDragOver} onDrop={handleDrop}>
      {widgetData && widgetData.map((widget) => <Widget widgetId={widget.id} key={widget.id} />)}
    </div>
  )
}

export default Screen
