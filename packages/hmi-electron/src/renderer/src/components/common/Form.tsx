import React from 'react'
import { cn } from '@renderer/lib/utils'

export const FieldWrap = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('bg-accent rounded-xl p-2 border shadow-md', className)}>{children}</div>
  )
}
