import * as React from 'react'
import { cn } from '@renderer/lib/utils'
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip'
import { useGetWidgetProperty, useUpsertProperty } from '@renderer/hooks/usepropertyqueries'

export type Axis = 'x' | 'y'

const NumberSpinner = ({
  axis,
  widgetId,
  propertyTemplateId,
  initialValue
}: {
  axis: Axis
  initialValue: number
  widgetId: string
  propertyTemplateId: string
}) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [mouseStartX, setMouseStartX] = React.useState(0)
  const [mouseStartY, setMouseStartY] = React.useState(0)
  const [draggingValue, setDraggingValue] = React.useState(initialValue as number)
  const upsertProperty = useUpsertProperty()

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    if (axis === 'x') {
      // pixel for pixel add
      setDraggingValue(initialValue + e.clientX - mouseStartX)
      upsertProperty.mutate({
        widgetId,
        propertyTemplateId,
        data: draggingValue
      })
    } else {
      setDraggingValue(initialValue + e.clientY - mouseStartY)
      upsertProperty.mutate({
        widgetId,
        propertyTemplateId,
        data: draggingValue
      })
    }
  }

  const handleMouseUp = async (e: MouseEvent) => {
    setIsDragging(false)
    // setValue(draggingValue)
    upsertProperty.mutate({
      widgetId,
      propertyTemplateId,
      data: draggingValue
    })
  }

  const handleMouseDown: React.MouseEventHandler<HTMLElement> = (e) => {
    setIsDragging(true)
    // setDraggingValue(value)
    setMouseStartX(e.clientX)
    setMouseStartY(e.clientY)
  }

  React.useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = axis === 'x' ? 'ew-resize' : 'ns-resize'
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, axis, handleMouseMove, handleMouseUp])

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            'hover:outline outline-1',
            axis === 'x' ? 'hover:cursor-ew-resize' : 'hover:cursor-ns-resize',
            'select-none'
          )}
          onMouseDown={handleMouseDown}
        >
          {/* {!isDragging ? initialValue : draggingValue} */}
          {draggingValue}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click and drag {axis === 'x' ? 'left and right' : 'up and down'} to adjust the number</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default NumberSpinner
