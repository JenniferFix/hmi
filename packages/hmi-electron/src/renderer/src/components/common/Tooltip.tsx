import * as React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'

export const BasicTooltip = ({
  children,
  content,
  asChild = false
}: {
  children: React.ReactNode
  content: React.ReactNode
  asChild?: boolean
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}
