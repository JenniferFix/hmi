import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
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

const ControllerList = () => {
  return <div>ControllerList</div>
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
              <Link to={link}>
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
    <Sidebar variant="floating">
      <SidebarHeader>Header</SidebarHeader>
      <CollapsibleSection title="App name here" defaultOpen>
        <SidebarContent>
          <SidebarGroup>
            <CollapsibleSection title="Controllers" link="/controllers">
              Controllers
            </CollapsibleSection>
            <CollapsibleSection title="Screens" link="/screens">
              <ScreensList />
            </CollapsibleSection>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/nodered">Node-RED</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </CollapsibleSection>
    </Sidebar>
  )
}

export default AppSidebar
