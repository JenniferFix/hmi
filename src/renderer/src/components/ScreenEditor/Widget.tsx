import React from 'react'
import { useGetWidget } from '@renderer/hooks/usewidgetqueries'
import Text from '@renderer/components/ScreenEditor/defaultwidgets/Text'
import Image from '@renderer/components/ScreenEditor/defaultwidgets/Image'
import { useEditorStore } from '@renderer/store'
import { cn } from '@renderer/lib/utils'

const Widget = ({ widgetId }: { widgetId: string }) => {
  const { data, isLoading, isError, error } = useGetWidget({ id: widgetId })
  const isSelected = useEditorStore((state) => state.selectedWidgets.includes(widgetId))
  const setSelected = useEditorStore((state) => state.setSelected)
  const addToSelected = useEditorStore((state) => state.addToSelected)
  const removeFromSelected = useEditorStore((state) => state.removeFromSelected)
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>WidgetError: {error?.message}</div>
  if (data === undefined) return <div>No Data</div>

  // GOAL: Render Widget.
  // Need to choose the specific component to render based on the widgetId and it's properties

  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const widgetId = e.currentTarget.dataset.widgetid
    if (e.shiftKey) {
      if (isSelected) {
        removeFromSelected(widgetId || '')
      } else {
        addToSelected(widgetId || '')
      }
    } else {
      setSelected(widgetId || '')
    }
  }

  return (
    <div
      key={data.id}
      data-widgetid={data.id}
      className={cn('hover:cursor-default select-none', isSelected ? 'outline outline-muted' : '')}
      style={{
        position: 'fixed',
        transform: `translate(${data.xPos}px, ${data.yPos}px)`
      }}
      onClick={handleClick}
    >
      {data.template.name === 'Text' && <Text widgetId={widgetId} />}
      {data.template.name === 'Image' && <Image widgetId={widgetId} />}
    </div>
  )
}

export default Widget
