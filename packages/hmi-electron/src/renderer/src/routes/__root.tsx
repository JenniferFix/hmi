import * as React from 'react'
import { Outlet, createRootRoute, ErrorComponentProps } from '@tanstack/react-router'
import SideMenu from '@renderer/components/SideMenu'

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className={`fixed inset-0 flex font-noto`}>
        <SideMenu />
        <Outlet />
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
