import * as React from 'react'

const PaletteOutline = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const ref = React.useRef(null)
  const handleDragStart: React.DragEventHandler<HTMLDivElement> = React.useCallback((e) => {
    e.preventDefault()
    //
    console.log('e', e)
    //console.log('data', data)
    // if (data && data.node) {
    // data.node.style.pointerEvents = 'none'
    // }
  }, [])

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = React.useCallback((e) => {
    e.preventDefault()
    console.log('e', e)
    //console.log('data', data)
    // if (data && data.node) {
    //   data.node.style.pointerEvents = 'auto'
    // }
  }, [])

  return (
    <div className="absolute inset-0 flex flex-col border border-muted-50">
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="bg-muted p-1 pl-3 shrink-0 text-sm font-semibold"
      >
        {title}
      </div>
      <div className="relative flex-1 min-h-0">{children}</div>
    </div>
  )
}

export default React.memo(PaletteOutline)
