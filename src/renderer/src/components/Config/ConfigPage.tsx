import React from 'react'
import { ThemeToggle } from '@renderer/components/Common/ThemeToggle'

const ConfigPage = () => {
  return (
    <div>
      <h2 className="text-xl">Config</h2>
      <div className="flex align-middle max-w-lg">
        <div>Toggle Theme</div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default ConfigPage
