import React from 'react'
import Draggable from 'react-draggable'

const PaletteOutline = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Draggable handle=".draggable-handle">
      <div className="absolute inset-0 flex flex-col border border-muted-50">
        <div className="draggable-handle bg-muted p-1 pl-3 shrink-0 text-sm font-semibold">
          {title}
        </div>
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </Draggable>
  )
}

export default PaletteOutline
