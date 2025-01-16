import React from 'react'
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel
} from '@renderer/components/ui/resizable'

const SidePanel = ({ panels }: { panels?: React.ReactNode[] }) => {
  const handleDragOver: React.DragEventHandler<keyof HTMLElementTagNameMap> = (e) => {
    e.preventDefault()
    console.log('dragover')
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop: React.DragEventHandler<keyof HTMLElementTagNameMap> = (e) => {
    e.preventDefault()
  }

  return (
    <ResizablePanelGroup direction="vertical">
      {panels &&
        panels.map((panel, idx) => (
          <React.Fragment key={'panel' + idx.toString()}>
            <ResizablePanel className="relative z-50">{panel}</ResizablePanel>
            {idx < panels.length - 1 && <ResizableHandle />}
          </React.Fragment>
        ))}
    </ResizablePanelGroup>
  )
}

export default SidePanel
