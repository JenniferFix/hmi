import React from 'react'
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel
} from '@renderer/components/ui/resizable'

const SidePanel = ({ panels }: { panels?: React.ReactNode[] }) => {
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <ResizablePanelGroup direction="vertical">
      {panels &&
        panels.map((panel, idx) => (
          <React.Fragment key={'panel' + idx.toString()}>
            <ResizablePanel className="relative">{panel}</ResizablePanel>
            {idx < panels.length - 1 && <ResizableHandle />}
          </React.Fragment>
        ))}
    </ResizablePanelGroup>
  )
}

export default SidePanel
