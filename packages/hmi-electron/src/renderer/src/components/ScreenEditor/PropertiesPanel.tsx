import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import PaletteWrap from '@renderer/components/ScreenEditor/PaletteWrap'
import { useEditorStore } from '@renderer/store'
import { useGetWidget } from '@renderer/hooks/usewidgetqueries'

const InnerPropertiesPanel = ({ widgetId }: { widgetId: string }) => {
  // This when there is a selected widget that we can get properties for
  const { data, isLoading, isError, error } = useGetWidget({ id: widgetId })
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error?.message}</div>
  if (!data) return <div>noData</div>

  // console.log(data)
  const props = data.template.properties.reduce((acc, curr) => {
    acc = { ...acc }
    acc[curr.name] = {
      ...curr
    }
    return acc
  }, {})
  // console.log('props', props)
  // console.log('data', data)

  /* Properties List
   *
   * Defaults for all widgets:
   * id
   * name
   * description
   * xPos
   * yPos
   * xScale
   * yScale
   * rotation
   * visible
   *
   */
  const defaults = [
    'id',
    'name',
    'description',
    'xPos',
    'yPos',
    'xScale',
    'yScale',
    'rotation',
    'visible'
  ]

  const getProperty = (propName: string, propertyTemplateId: string) => {
    const [val] = data.properties.filter((p) => p.propertyTemplateId === propertyTemplateId)
    if (val?.data) return val.data
    return props[propName].default
  }

  return (
    <ScrollArea className="absolute inset-0 h-full">
      <Table className="h-full">
        <TableCaption hidden>Properties</TableCaption>
        <TableHeader hidden>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {defaults.map((d) => (
            <TableRow key={d}>
              <TableCell>{d}</TableCell>
              <TableCell>{data[d]}</TableCell>
            </TableRow>
          ))}
          {data.template.properties.map((prop) => (
            <TableRow key={prop.id}>
              <TableCell>{prop.name}</TableCell>

              <TableCell>{getProperty(prop.name, prop.id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

const OuterPropertiesPanel = () => {
  const selectedWidgets = useEditorStore((state) => state.selectedWidgets)
  if (selectedWidgets.length > 1) return <div>Multiple Selected</div>
  if (selectedWidgets.length === 0) return <div>Select a Widget</div>
  if (selectedWidgets.length === 1) return <InnerPropertiesPanel widgetId={selectedWidgets[0]} />
  return <div>Error</div>
}

const WrappedPropertiesPanel = () => {
  return (
    <PaletteWrap title="Properties">
      <OuterPropertiesPanel />
    </PaletteWrap>
  )
}

export default WrappedPropertiesPanel
