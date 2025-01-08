import React from 'react'
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel
} from '@renderer/components/ui/resizable'

const SidePanel = ({ panels }: { panels?: React.ReactNode[] }) => {
  return (
    <ResizablePanelGroup direction="vertical">
      {panels &&
        panels.map((panel, idx) => (
          <React.Fragment key={'panel' + idx.toString()}>
            <ResizablePanel className="relative">{panel}</ResizablePanel>
            {idx < panels.length - 1 && <ResizableHandle withHandle />}
          </React.Fragment>
        ))}
    </ResizablePanelGroup>
  )
}

export default SidePanel
