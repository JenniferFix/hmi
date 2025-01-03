import React from 'react'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from '@renderer/components/ui/resizable'
import ScreenPane from '@renderer/components/ScreenEditor/ScreenSelectorPane'
import { Outlet } from '@tanstack/react-router'

const Editor = () => {
  return (
    <ResizablePanelGroup direction="horizontal" autoSaveId="jahmi-edit-panels">
      <ResizablePanel defaultSize={25} children={<ScreenPane />} />
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} children={<Outlet />} />
    </ResizablePanelGroup>
  )
}

export default Editor
