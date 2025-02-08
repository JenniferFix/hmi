import React from 'react'
import ControllerAddEditForm from './ControllerAddEditForm'
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle
} from '@renderer/components/ui/resizable'

const ControllerPanel = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <ControllerAddEditForm />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>ControllerState (if connected)</ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ControllerPanel
