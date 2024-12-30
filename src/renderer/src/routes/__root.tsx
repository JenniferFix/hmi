import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import SideMenu from '@renderer/components/SideMenu'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="absolute inset-0 flex">
        <SideMenu />
        <Outlet />
      </div>
    </React.Fragment>
  )
}
