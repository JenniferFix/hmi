import * as React from 'react'
import { SidebarTrigger } from '@renderer/components/ui/sidebar'

const AppHeader = () => {
  return (
    <header className=" sticky">
      <div className="flex items-center pl-4 h-[--header-height]">
        <SidebarTrigger />
      </div>
    </header>
  )
}

export default AppHeader
