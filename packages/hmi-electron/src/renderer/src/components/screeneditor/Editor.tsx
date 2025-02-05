import React from 'react'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from '@renderer/components/ui/resizable'
import { Outlet } from '@tanstack/react-router'
import SidePanel from './SidePanel'

const Editor = () => {
  return (
    <ResizablePanelGroup direction="horizontal" autoSaveId="jahmi-edit-panels">
      <ResizablePanel defaultSize={60} className="relative">
        <Outlet />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={15}>
        <SidePanel panels={['widgets', 'properties']} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default React.memo(Editor)
