import React from 'react'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from '@renderer/components/ui/resizable'
import { Outlet } from '@tanstack/react-router'
import SidePanel from './SidePanel'
import AddComponentsPane from './ComponentPane'
import ScreenPane from '@renderer/components/ScreenEditor/ScreensPane'

const Editor = () => {
  return (
    <ResizablePanelGroup direction="horizontal" autoSaveId="jahmi-edit-panels">
      <ResizablePanel
        defaultSize={25}
        children={<SidePanel panels={[<ScreenPane />, <AddComponentsPane />]} />}
      />
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} children={<Outlet />} />
    </ResizablePanelGroup>
  )
}

export default Editor
