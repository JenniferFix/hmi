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
      <div className={`fixed inset-0 flex font-noto`}>
        <Sidebar />
        <SidebarInset className="flex flex-col">
          <AppHeader />
          <main className="grow">
            <Outlet />
          </main>
        </SidebarInset>
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
