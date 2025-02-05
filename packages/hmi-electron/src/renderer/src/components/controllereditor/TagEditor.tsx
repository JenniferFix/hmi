import React from 'react'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from '@renderer/components/ui/resizable'
import { Outlet } from '@tanstack/react-router'

const TagEditor = () => {
  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel>Top</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Bottom</ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default TagEditor
