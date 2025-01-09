import React from 'react'
import { useGetComponentTemplates } from '@renderer/hooks/usecomponenttemplatequeries'
import PaletteWrap from './PaletteWrap'
import { ScrollArea } from '@renderer/components/ui/scroll-area'

const ComponentPalette = () => {
  const { data, isLoading, isError, error } = useGetComponentTemplates()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <ScrollArea className="h-full">
      <div>{data && data.map((component) => <div key={component.id}>{component.name}</div>)}</div>
    </ScrollArea>
  )
}

const WrappedComponentPalette = () => {
  return (
    <PaletteWrap title="Components">
      <ComponentPalette />
    </PaletteWrap>
  )
}
export default WrappedComponentPalette
