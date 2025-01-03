import React from 'react'
import { useGetScreen } from '@renderer/hooks/usescreensqueries'

const Screen = ({ screenId }: { screenId: string }) => {
  const getScreen = useGetScreen({ id: screenId })
  return <div>Screen {screenId}</div>
}

export default Screen
