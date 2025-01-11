import React from 'react'
import { useGetComponentTemplates } from '@renderer/hooks/usecomponenttemplatequeries'
import PaletteWrap from './PaletteWrap'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { TypeOutline, Image } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from '@renderer/components/ui/tooltip'

type DragData = {
  type: string
  id: string
  name: string
}

const WidgetPalette = () => {
  const { data, isLoading, isError, error } = useGetComponentTemplates()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  console.log('widgets', data)

  const handleDragStart = (e: React.DragEvent<HTMLElement>, data) => {
    const dragData = {
      type: 'widget',
      id: 'component.id',
      name: 'component.name'
    }
    console.log('widget onDragStart', e)
    e.dataTransfer.setData('text/plain', 'id')
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnd: React.DragEventHandler<HTMLElement> = (e) => {
    console.log('widget onDragEnd', e)
  }

  const getIcon = (componentName: string): React.ReactNode | null => {
    switch (componentName) {
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
          data.map((component) => (
            <Tooltip key={component.id}>
              <TooltipTrigger asChild>
                <Button
                  className="w-full"
                  variant="outline"
                  size="sm"
                  draggable
                  onDragStart={(e) => handleDragStart(e, component)}
                  onDragEnd={handleDragEnd}
                >
                  {getIcon(component.name || '')}
                  {component.name}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{component.description}</TooltipContent>
            </Tooltip>
          ))}
      </div>
    </ScrollArea>
  )
}

const WrappedWidgetPalette = () => {
  return (
    <PaletteWrap title="Components">
      <WidgetPalette />
    </PaletteWrap>
  )
}
export default WrappedWidgetPalette
