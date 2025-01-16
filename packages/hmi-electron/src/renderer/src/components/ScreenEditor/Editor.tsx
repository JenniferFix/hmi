import React from 'react'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from '@renderer/components/ui/resizable'
import { Outlet } from '@tanstack/react-router'
import SidePanel from './SidePanel'
import ComponentPalette from './WidgetPalette'
import ScreenPalette from '@renderer/components/ScreenEditor/ScreenPalette'
import ScreenTree from './ScreenTree'
import PropertiesPanel from './PropertiesPanel'

const Editor = () => {
  return (
    <ResizablePanelGroup direction="horizontal" autoSaveId="jahmi-edit-panels">
      <ResizablePanel
        defaultSize={15}
        children={<SidePanel panels={[<ScreenPalette />, <ComponentPalette />]} />}
      />
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60} className="relative">
        <Outlet />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={15}>
        <SidePanel panels={[<ScreenTree />, <PropertiesPanel />]} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Editor
