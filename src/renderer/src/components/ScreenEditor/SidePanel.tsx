import React from 'react'

const SidePanel = ({ panels }: { panels?: React.ReactNode[] }) => {
  return (
    <div className="flex flex-col p-2 gap-2">
      {panels &&
        panels.map((panel, idx) => (
          <React.Fragment key={panel + idx.toString()}>{panel}</React.Fragment>
        ))}
    </div>
  )
}

export default SidePanel
