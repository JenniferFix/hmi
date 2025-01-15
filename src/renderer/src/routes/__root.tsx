import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import SideMenu from '@renderer/components/SideMenu'

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className={`absolute inset-0 flex font-noto`}>
        <SideMenu />
        <Outlet />
      </div>
    </React.Fragment>
  )
}

function ErrorComponent({ error, reset }) {
  return (
    <React.Fragment>
      <div>Error!!!</div>
      <div>{error}</div>
      <button onClick={() => reset()}>Reset Error</button>
    </React.Fragment>
  )
}
