import React from 'react'
import { Button } from '@renderer/components/ui/button'
import { FolderIcon } from 'lucide-react'

const Home = () => {
  return (
    <div className="m-auto">
      <h2 className="text-2xl">Create or open a new project:</h2>
      <div>
        <Button size="icon" variant="outline">
          <FolderIcon className="" />
        </Button>
      </div>
    </div>
  )
}

export default Home
