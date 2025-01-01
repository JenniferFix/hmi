import React from 'react'
import { Button } from '@renderer/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@renderer/components/ui/tooltip'
import { HomeIcon, FilePenLineIcon, TagIcon } from 'lucide-react'
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
  }
]

const SideMenu = () => {
  return (
    <div className="bg-accent flex flex-col gap-1 py-2 px-2">
      {menuItems.map((item) => (
        <TooltipProvider key={item.url}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label={item.tooltip}
                size="icon"
                variant="outline"
                asChild
              >
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
  )
}

export default SideMenu
