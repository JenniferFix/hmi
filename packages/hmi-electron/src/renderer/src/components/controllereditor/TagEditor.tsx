import React from 'react'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from '@renderer/components/ui/resizable'
import ControllerAddEditForm from './ControllerAddEditForm'
import { Outlet } from '@tanstack/react-router'

const TagEditor = () => {
  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel>
        <ControllerAddEditForm />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Controller's Tags. Data table shadcn</ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default TagEditor
