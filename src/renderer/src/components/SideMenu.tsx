import React from 'react'
import { Button } from '@renderer/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@renderer/components/ui/tooltip'
import {
  HomeIcon,
  FilePenLineIcon,
  TagIcon,
  SettingsIcon,
  FilesIcon,
  MonitorIcon,
  SquareCodeIcon,
  CodeSquareIcon
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

type MenuItem = {
  tooltip: string
  icon: React.ReactNode
  url: string
}

const menuItems: MenuItem[] = [
  {
    tooltip: 'Home',
    icon: <HomeIcon />,
    url: '/'
  },
  {
    tooltip: 'Edit',
    icon: <FilePenLineIcon />,
    url: '/edit'
  },
  {
    tooltip: 'Edit Tags',
    icon: <TagIcon />,
    url: '/tags'
  },
  {
    tooltip: 'Code',
    icon: <CodeSquareIcon />,
    url: '/code'
  }
]

const SideMenu = () => {
  return (
    <div className="bg-accent flex flex-col py-2 px-2 justify-between">
      <div className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <TooltipProvider key={item.url}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button aria-label={item.tooltip} size="icon" variant="outline" asChild>
                  <Link to={item.url}>{item.icon}</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline">
                <Link to="/config">
                  <SettingsIcon />
                </Link>
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default SideMenu
