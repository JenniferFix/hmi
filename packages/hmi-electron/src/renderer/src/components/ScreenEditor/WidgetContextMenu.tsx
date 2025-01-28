import * as React from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuCheckboxItem
} from '@renderer/components/ui/context-menu'
import { useDeleteWidget } from '@renderer/hooks/usewidgetqueries'

const WidgetContextMenu = ({
  widgetId,
  children
}: {
  widgetId: string
  children: React.ReactNode
}) => {
  const deleteWidget = useDeleteWidget()
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem inset onSelect={() => deleteWidget.mutate({ widgetId })}>
          <span className="text-destructive">Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default React.memo(WidgetContextMenu)
