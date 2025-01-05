import React from 'react'

const PaletteOutline = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex flex-col border border-muted-50">
      <div className="bg-muted p-1 pl-3">{title}</div>
      <div className="grow p-1">{children}</div>
    </div>
  )
}

export default PaletteOutline
