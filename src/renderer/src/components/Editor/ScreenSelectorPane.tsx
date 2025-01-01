import React from 'react'
import { Button } from '@renderer/components/ui/button'
import { useInsertScreen, useGetScreens } from '@renderer/hooks/usescreensqueries'
import { Link } from '@tanstack/react-router'

const ScreenPane = () => {
  const insertScreen = useInsertScreen()
  const { isError, isLoading, data, error } = useGetScreens()

  const handleAddScreen = () => {
    insertScreen.mutate({ name: 'NewScreen' })
  }

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>{error.message}</div>

  return (
    <div className="flex flex-col justify-between h-full p-2 pb-4">
      <div>
        {data ? (
          data.map((screen) => (
            <Button key={screen.id} className="w-full" variant="link" asChild>
              <Link to={`/edit/$screenId`} params={{ screenId: screen.id.toString() }}>
                {screen.name}
              </Link>
            </Button>
          ))
        ) : (
          <div>no data</div>
        )}
      </div>
      <Button variant="outline" className="w-full text-lg" onClick={handleAddScreen}>
        Add
      </Button>
    </div>
  )
}

export default ScreenPane
