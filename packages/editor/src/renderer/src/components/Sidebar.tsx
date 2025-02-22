import * as React from 'react'
import { ChevronRight } from 'lucide-react'
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarGroupContent,
//   SidebarGroupAction,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton
// } from '@renderer/components/ui/sidebar'
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

const ControllerList = React.memo(() => {
  const { data, isLoading, isError, error } = useGetControllers()
  if (isLoading) return null
  if (isError) throw new Error('Error in ControllerList')
  if (data && data.length === 0)
    return (
      <Button asChild>
        <Link
          to={'/controllers/add'}
          activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
        >
          Add Controller
        </Link>
      </Button>
    )

  return (
    <>
      {data?.map((controller, idx) => {
        return (
          <Link
            key={idx}
            to="/controllers/$controllerId"
            params={{ controllerId: controller.id }}
            activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
          >
            {controller.ip}
          </Link>
        )
      })}
    </>
  )
})

const ScreensList = React.memo(() => {
  const { data, isLoading, isError, error } = useGetScreens()
  if (isLoading) return null
  if (isError) return null
  if (data && data.length === 0) return <div>Add screen</div>
  return (
    <>
      {data?.map((screen, i) => (
        <Link
          key={i}
          to={`/screens/$screenId`}
          params={{ screenId: screen.id.toString() }}
          activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
        >
          {screen.name}
        </Link>
      ))}
    </>
  )
})

const CollapsibleSection = React.memo(
  ({
    children,
    className,
    title,
    link,
    defaultOpen = false
  }: {
    children: React.ReactNode
    className?: string
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
        className={cn('group/collapsible pl-2', className)}
      >
        <CollapsibleTrigger asChild>
          <Link
            className="flex justify-between"
            to={link}
            //TODO: Fix this so if any children are selected this is not, it looks silly otherwise
            // activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
          >
            {title}
            <ChevronRight
              className={cn('inline-block ml-auto transition-transform', open ? 'rotate-90' : '')}
            />
          </Link>
        </CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
    )
  }
)

const AppSidebar = () => {
  return (
    <div
      // variant="floating"
      className="h-full w-[20rem] px-2 pb-2 rounded-xl"
      // className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
    >
      <div className="h-full flex flex-col gap-2 bg-sidebar-accent text-sidebar-accent-foreground p-2">
        {/* <SidebarHeader>Header</SidebarHeader> */}
        <CollapsibleSection className="flex flex-col gap-2" title="App name here" defaultOpen>
          <CollapsibleSection
            className="flex flex-col gap-2"
            title="Controllers"
            link="/controllers"
          >
            <ControllerList />
          </CollapsibleSection>
          <CollapsibleSection title="Screens" link="/screens">
            <ScreensList />
          </CollapsibleSection>
          <Link
            to="/nodered"
            activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
          >
            Node-RED
          </Link>
        </CollapsibleSection>
        <Link
          className="flex"
          to="/config"
          activeProps={{ className: 'bg-sidebar-accent text-sidebar-accent-foreground' }}
        >
          <Settings className={cn('inline-block')} />
          <span className="pl-2">Settings</span>
        </Link>
      </div>
    </div>
  )
}

export default React.memo(AppSidebar)
