import * as React from 'react'
import { useGetWidget } from '@renderer/hooks/usewidgetqueries'
import Text from '@renderer/components/ScreenEditor/defaultwidgets/Text'
import Image from '@renderer/components/ScreenEditor/defaultwidgets/Image'
import { useEditorStore } from '@renderer/store'
import { cn } from '@renderer/lib/utils'
import WidgetContextMenu from './WidgetContextMenu'
import { EditDragData } from '@renderer/types'

const Widget = ({ widgetId }: { widgetId: string }) => {
  const { data, isLoading, isError, error } = useGetWidget({ id: widgetId })
  const isSelected = useEditorStore((state) => state.selectedWidgets.includes(widgetId))
  const setSelected = useEditorStore((state) => state.setSelected)
  const addToSelected = useEditorStore((state) => state.addToSelected)
  const removeFromSelected = useEditorStore((state) => state.removeFromSelected)

  const handleClick: React.MouseEventHandler<HTMLElement> = React.useCallback(
    (e) => {
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
    },
    [widgetId]
  )

  const handleDragStart = React.useCallback((e: React.DragEvent<HTMLElement>, widgetId: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xOffset = e.clientX - rect.left
    const yOffset = e.clientY - rect.top

    const dragData: EditDragData = {
      type: 'widget',
      id: widgetId,
      xOffset,
      yOffset
    }
    e.dataTransfer.effectAllowed = 'copyMove'
    e.dataTransfer.setData('text/plain', widgetId)
    e.dataTransfer.setData('application/json', JSON.stringify(dragData))
    // console.log('widget onDragStart', e)
  }, [])

  const handleDragEnd: React.DragEventHandler<HTMLElement> = React.useCallback((e) => {
    // console.log('widget onDragEnd', e)
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>WidgetError: {error?.message}</div>
  if (data === undefined) return <div>No Data</div>
  const props = data.template.properties.reduce((acc, curr) => {
    acc = { ...acc }
    acc[curr.name] = {
      ...curr
    }
    return acc
  }, {})

  const getProperty = (propName: string) => {
    if (!data) throw new Error('Errror in getProperty, no data')
    const [propTemplate] = data.template.properties.filter((prop) => prop.name === propName)
    // const [val] = data.properties.filter((p) => p.propertyTemplateId === propertyTemplateId)
    // if (val?.data) return val.data
    // return props[propName].default
    const [propdata] = data.properties.filter((prop) => prop.propertyTemplateId === propTemplate.id)
    return propdata?.data ?? propTemplate.default
  }

  return (
    <WidgetContextMenu widgetId={widgetId}>
      <div
        key={data.id}
        data-widgetid={data.id}
        className={cn(
          'hover:cursor-default select-none hover:bg-accent',
          isSelected
            ? 'bg-accent shadow-[0_0_5px] shadow-foreground outline outline-1 outline-accent'
            : ''
        )}
        style={{
          position: 'fixed',
          transform: `translate(${getProperty('posX')}px, ${getProperty('posY')}px)`
        }}
        onClick={handleClick}
        draggable
        onDragStart={(e) => handleDragStart(e, widgetId)}
        onDragEnd={handleDragEnd}
      >
        {data.template.name === 'Text' && <Text widgetId={widgetId} />}
        {data.template.name === 'Image' && <Image widgetId={widgetId} />}
      </div>
    </WidgetContextMenu>
  )
}

export default React.memo(Widget)
