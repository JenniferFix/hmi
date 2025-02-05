import './assets/globals.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter, createHashHistory } from '@tanstack/react-router'
import { ThemeProvider } from '@renderer/components/theme-provider'
import { TooltipProvider } from '@renderer/components/ui/tooltip'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from '@renderer/components/ui/sonner'
import { SidebarProvider } from '@renderer/components/ui/sidebar'

const router = createRouter({ routeTree, history: createHashHistory() })
const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="jahmi-ui-theme">
        <TooltipProvider>
          <SidebarProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
          </SidebarProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
