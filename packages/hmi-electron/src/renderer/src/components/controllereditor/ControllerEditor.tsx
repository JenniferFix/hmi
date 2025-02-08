import React from 'react'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from '@renderer/components/ui/resizable'
import ControllerAddEditForm from './ControllerAddEditForm'
import { Outlet } from '@tanstack/react-router'
import ControllerPanel from './ControllerPanel'

const ControllerEditor = () => {
  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel>
        <ControllerPanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Controller's Tags. Data table shadcn</ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ControllerEditor
