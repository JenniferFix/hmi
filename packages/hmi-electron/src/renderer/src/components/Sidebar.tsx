import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@renderer/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@renderer/components/ui/collapsible'
import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'
import { Link } from '@tanstack/react-router'
import { useGetScreens } from '@renderer/hooks/usescreensqueries'
import { useGetControllers } from '@renderer/hooks/usecontrollerqueries'
import { Settings } from 'lucide-react'

const ControllerList = () => {
  const { data, isLoading, isError, error } = useGetControllers()
  if (isLoading) return null
  if (isError) throw new Error('Error in ControllerList')
  if (data && data.length === 0)
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>Add Controller</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  return (
    <SidebarMenu>
      {data?.map((controller, idx) => {
        return (
          <SidebarMenuItem key={idx}>
            <SidebarMenuButton>{controller.ip}</SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

const ScreensList = () => {
  const { data, isLoading, isError, error } = useGetScreens()
  if (isLoading) return null
  if (isError) return null
  if (data && data.length === 0) return <SidebarMenu>Add screen</SidebarMenu>
  return (
    <SidebarMenu>
      {data?.map((screen, i) => (
        <SidebarMenuItem key={i}>
          <SidebarMenuButton asChild>
            <Link
              to={`/screens/$screenId`}
              params={{ screenId: screen.id.toString() }}
              activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
            >
              {screen.name}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

const CollapsibleSection = ({
  children,
  title,
  link,
  defaultOpen = false
}: {
  children: React.ReactNode
  title: string
  link?: string
  defaultOpen?: boolean
}) => {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <Collapsible
      open={open}
      onOpenChange={(open) => setOpen(open)}
      defaultOpen={defaultOpen}
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className={`group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton asChild className="w-full">
              <Link
                to={link}
                //TODO: Fix this so if any children are selected this is not, it looks silly otherwise
                // activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
              >
                {title}
                <ChevronRight
                  className={cn('ml-auto transition-transform', open ? 'rotate-90' : '')}
                />
              </Link>
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

const AppSidebar = () => {
  return (
    <Sidebar
      variant="floating"
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
    >
      <SidebarHeader>Header</SidebarHeader>
      <CollapsibleSection title="App name here" defaultOpen>
        <SidebarContent>
          <SidebarGroup>
            <CollapsibleSection title="Controllers" link="/controllers">
              <ControllerList />
            </CollapsibleSection>
            <CollapsibleSection title="Screens" link="/screens">
              <ScreensList />
            </CollapsibleSection>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/nodered"
                    activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
                  >
                    Node-RED
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </CollapsibleSection>
      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/config"
                activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
              >
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
