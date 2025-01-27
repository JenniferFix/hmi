import React from 'react'
import { cn } from '@renderer/lib/utils'
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip'

export type Axis = 'x' | 'y'

const NumberSpinner = ({
  axis,
  value,
  setValue
}: {
  axis: Axis
  value: number
  /*
   *return value is if succeeds if fails we return back to value instead of temp value
   */
  setValue: (val: number) => boolean
}) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [mouseStartX, setMouseStartX] = React.useState(0)
  const [mouseStartY, setMouseStartY] = React.useState(0)
  const [tempValue, setTempValue] = React.useState(0)

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const handleMouseDown: React.MouseEventHandler<HTMLElement> = (e) => {
    setIsDragging(true)
    setTempValue(value)
    setMouseStartX(e.clientX)
    setMouseStartY(e.clientY)
    console.log(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    if (axis === 'x') {
      // pixel for pixel add
      setTempValue(value + e.clientX - mouseStartX)
    } else {
      setTempValue(value + e.clientY - mouseStartY)
    }
  }

  const handleMouseUp = (e: MouseEvent) => {
    setIsDragging(false)
    setValue(tempValue)
  }

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
          {!isDragging ? value : tempValue}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click and drag {axis === 'x' ? 'left and right' : 'up and down'} to adjust the number</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default NumberSpinner
