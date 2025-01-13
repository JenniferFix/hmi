import React from 'react'
import { useGetComponentTemplates } from '@renderer/hooks/usewidgettemplatequeries'
import PaletteWrap from './PaletteWrap'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { TypeOutline, Image } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '@renderer/components/ui/tooltip'
import { type WidgetType } from '$/src/db/schema/widget'

export type DragData = {
  type: string
  id: string
  name: string
}

const WidgetPalette = () => {
  const { data, isLoading, isError, error } = useGetComponentTemplates()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  const handleDragStart = (e: React.DragEvent<HTMLElement>, widget: WidgetType) => {
    const dragData: DragData = {
      type: 'widget',
      id: widget.id,
      name: widget.name || ''
    }
    e.dataTransfer.setData('text/plain', widget.id)
    e.dataTransfer.setData('application/json', JSON.stringify(dragData))
    // console.log('widget onDragStart', e)
  }

  const handleDragEnd: React.DragEventHandler<HTMLElement> = (e) => {
    // console.log('widget onDragEnd', e)
  }

  const getIcon = (widgetName: string): React.ReactNode | null => {
    switch (widgetName) {
      case 'Text':
        return <TypeOutline className="inline" />
      case 'Image':
        return <Image className="inline" />
      default:
        return null
    }
  }
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-1 p-1">
        {data &&
          data.map((widget) => (
            <Tooltip key={widget.id}>
              <TooltipTrigger asChild>
                <Button
                  className="w-full"
                  variant="outline"
                  size="sm"
                  draggable
                  onDragStart={(e) => handleDragStart(e, widget as WidgetType)}
                  onDragEnd={handleDragEnd}
                >
                  {getIcon(widget.name || '')}
                  {widget.name}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{widget.description}</TooltipContent>
            </Tooltip>
          ))}
      </div>
    </ScrollArea>
  )
}

const WrappedWidgetPalette = () => {
  return (
    <PaletteWrap title="Widgets">
      <WidgetPalette />
    </PaletteWrap>
  )
}
export default WrappedWidgetPalette
