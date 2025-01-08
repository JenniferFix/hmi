import React from 'react'
import { useGetScreen } from '@renderer/hooks/usescreensqueries'
import SidePanel from '@renderer/components/ScreenEditor/SidePanel'

const Screen = ({ screenId }: { screenId: string }) => {
  const { data, isLoading, isError, error } = useGetScreen({ id: screenId })
  if (isLoading) return <div>loading...</div>
  if (isError) return <div>Error: {error?.message}</div>

  console.log('editor', data)
  return <div className="absolute inset-0 bg-purple-50">MainEditor</div>
}

export default Screen
