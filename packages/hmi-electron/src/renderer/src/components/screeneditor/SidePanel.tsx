import React from 'react'
import { ResizablePanelGroup, ResizableHandle } from '@renderer/components/ui/resizable'
import ScreenPalette from './ScreenPalette'
import WidgetPalette from './WidgetPalette'
import ScreenTree from './ScreenTree'
import PropertiesPanel from './PropertiesPanel'
import { type PanelId } from '@renderer/types'

const SidePanel = ({ panels }: { panels: PanelId[] }) => {
  const renderSpecific = (panel: PanelId) => {
    switch (panel) {
      case 'screens':
        return <ScreenPalette />
      case 'widgets':
        return <WidgetPalette />
      case 'treeview':
        return <ScreenTree />
      case 'properties':
        return <PropertiesPanel />
    }
  }

  const handleDragOver: React.DragEventHandler<keyof HTMLElementTagNameMap> = React.useCallback(
    (e) => {
      e.preventDefault()
      console.log('dragover')
      e.dataTransfer.dropEffect = 'move'
    },
    []
  )

  const handleDrop: React.DragEventHandler<keyof HTMLElementTagNameMap> = React.useCallback((e) => {
    e.preventDefault()
  }, [])

  return (
    <ResizablePanelGroup direction="vertical">
      {panels.map((panel, idx) => {
        return (
          <React.Fragment key={idx}>
            {renderSpecific(panel)}
            {idx < panels.length - 1 && <ResizableHandle />}
          </React.Fragment>
        )
      })}
    </ResizablePanelGroup>
  )
}

export default React.memo(SidePanel)
