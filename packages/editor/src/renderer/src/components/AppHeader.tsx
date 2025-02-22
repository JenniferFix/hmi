import * as React from 'react'
import { SidebarTrigger } from '@renderer/components/ui/sidebar'

const AppHeader = React.memo(() => {
  return (
    <header className="flex items-center px-2 py-2">
      <div className="bg-sidebar-accent text-sidebar-accent-foreground flex w-full border rounded-lg shadow-sm">
        {/* <SidebarTrigger /> */}
        Button
      </div>
    </header>
  )
})

export default AppHeader
