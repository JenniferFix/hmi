import React from 'react'
import { useGetScreen } from '@renderer/hooks/usescreensqueries'
import SidePanel from '@renderer/components/ScreenEditor/SidePanel'

const Screen = ({ screenId }: { screenId: string }) => {
  const { data, isLoading, isError, error } = useGetScreen({ id: screenId })
  if (isLoading) return <div>loading...</div>
  if (isError) return <div>Error: {error?.message}</div>

  const handleDragOver: React.DragEventHandler<HTMLElement> = (e) => {
    console.log('dragOver', e)
  }
  const handleDrop: React.DragEventHandler<HTMLElement> = (e) => {
    console.log('drop', e)
    // TODO: Database call to add element instance to screen
  }
  console.log('editor screen data', data)
  return (
    <div className="absolute inset-0 bg-purple-50" onDragOver={handleDragOver} onDrop={handleDrop}>
      MainEditor
    </div>
  )
}

export default Screen
