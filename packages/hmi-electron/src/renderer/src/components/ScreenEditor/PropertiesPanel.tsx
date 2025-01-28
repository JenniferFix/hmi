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
import NumberSpinner from '@renderer/components/ui/numberspinner'
import { useUpdateWidget } from '@renderer/hooks/usewidgetqueries'

const InnerPropertiesPanel = React.memo(({ widgetId }: { widgetId: string }) => {
  // This when there is a selected widget that we can get properties for
  const { data, isLoading, isError, error } = useGetWidget({ id: widgetId })
  const updateWidget = useUpdateWidget()
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
    if (val?.data) {
      //
      console.log(val)
      return val.data
    }
    return props[propName].default
  }

  const setProperty = async (val: any): Promise<boolean> => {
    //
    const result = await updateWidget.mutateAsync({ id: widgetId })
    return true
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

              <TableCell>
                {typeof data[d] === 'string' && data[d]}
                {typeof data[d] === 'number' && (
                  <NumberSpinner axis="x" value={data[d]} setValue={setProperty} />
                )}
              </TableCell>
            </TableRow>
          ))}
          {data.template.properties.map((prop) => (
            <TableRow key={prop.id}>
              <TableCell>{prop.name}</TableCell>

              <TableCell>
                {prop.dataType.typescriptType === 'string' && getProperty(prop.name, prop.id)}
                {prop.dataType.typescriptType === 'number' && (
                  <NumberSpinner
                    axis="x"
                    value={getProperty(prop.name, prop.id)}
                    setValue={setProperty}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
})

const OuterPropertiesPanel = React.memo(() => {
  const selectedWidgets = useEditorStore((state) => state.selectedWidgets)
  if (selectedWidgets.length > 1) return <div>Multiple Selected</div>
  if (selectedWidgets.length === 0) return <div>Select a Widget</div>
  if (selectedWidgets.length === 1) return <InnerPropertiesPanel widgetId={selectedWidgets[0]} />
  return <div>Error</div>
})

const WrappedPropertiesPanel = () => {
  return (
    <PaletteWrap title="Properties">
      <OuterPropertiesPanel />
    </PaletteWrap>
  )
}

export default React.memo(WrappedPropertiesPanel)
