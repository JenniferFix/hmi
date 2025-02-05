import * as React from 'react'
import { SidebarTrigger } from '@renderer/components/ui/sidebar'

const AppHeader = () => {
  return (
    <header className="sticky">
      <SidebarTrigger />
    </header>
  )
}

export default AppHeader
