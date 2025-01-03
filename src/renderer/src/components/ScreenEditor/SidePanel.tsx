import React from 'react'
import ScreenPane from './ScreensPane'
import ComponentsPane from './ComponentPane'

const SidePanel = ({ panels }: { panels?: React.ReactNode[] }) => {
  return (
    <div className="flex flex-col">
      {panels &&
        panels.map((panel, idx) => (
          <React.Fragment key={panel + idx.toString()}>{panel}</React.Fragment>
        ))}
    </div>
  )
}

export default SidePanel
