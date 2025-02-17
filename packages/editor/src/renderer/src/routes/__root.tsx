import * as React from 'react'
import { Outlet, createRootRoute, ErrorComponentProps } from '@tanstack/react-router'
import Sidebar from '@renderer/components/Sidebar'
import AppHeader from '@renderer/components/AppHeader'
import { SidebarInset } from '@renderer/components/ui/sidebar'

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className={`w-full flex flex-col font-noto [--header-height:calc(theme(spacing.12))]`}>
        {/* <div className="w-full flex flex-col"> */}
        <AppHeader />
        <div className="flex">
          <Sidebar />
          <SidebarInset className="flex flex-col">
            <Outlet />
          </SidebarInset>
        </div>
      </div>
    </React.Fragment>
  )
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <React.Fragment>
      <div>Error!!!</div>
      <div>{error.message}</div>
      <button onClick={() => reset()}>Reset Error</button>
    </React.Fragment>
  )
}
