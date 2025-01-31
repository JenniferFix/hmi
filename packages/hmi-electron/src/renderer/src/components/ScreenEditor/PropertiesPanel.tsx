import * as React from 'react'
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
import { useUpsertProperty } from '@renderer/hooks/usepropertyqueries'

const InnerPropertiesPanel = React.memo(({ widgetId }: { widgetId: string }) => {
  // This when there is a selected widget that we can get properties for
  const { data, isLoading, isError, error } = useGetWidget({ id: widgetId })
  const updateWidget = useUpdateWidget()
  const upsertProperty = useUpsertProperty()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error?.message}</div>
  if (!data) return <div>noData</div>

  const props = data.template.properties.reduce((acc, curr) => {
    acc = { ...acc }
    acc[curr.name] = {
      ...curr
    }
    return acc
  }, {})

  const getProperty = (propName: string, propertyTemplateId: string) => {
    const [val] = data.properties.filter((p) => p.propertyTemplateId === propertyTemplateId)
    if (val?.data) {
      return val.data
    }
    return props[propName].default
  }

  const setProperty = async (propName: string, value: string | number): Promise<boolean> => {
    console.log('setProperty', value)
    const [prop] = data.template.properties.filter((p) => p.name === propName)
    //
    const newProp = await upsertProperty.mutateAsync({
      widgetId,
      propertyTemplateId: prop.id,
      data: value
    })
    console.log('newprop', newProp)
    if (newProp) return true
    return false
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
          {data.template.properties.map((prop) => (
            <TableRow key={prop.id}>
              <TableCell>{prop.name}</TableCell>

              <TableCell>
                {prop.dataType.typescriptType === 'string' && getProperty(prop.name, prop.id)}
                {prop.dataType.typescriptType === 'number' && (
                  <NumberSpinner
                    axis="x"
                    initialValue={getProperty(prop.name, prop.id)}
                    widgetId={widgetId}
                    propertyTemplateId={
                      data.template.properties.filter((p) => p.name === prop.name)[0].id
                    }
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
InnerPropertiesPanel.displayName = 'InnerPropertiesPanel'

const OuterPropertiesPanel = React.memo(() => {
  const selectedWidgets = useEditorStore((state) => state.selectedWidgets)
  if (selectedWidgets.length > 1) return <div>Multiple Selected</div>
  if (selectedWidgets.length === 0) return <div>Select a Widget</div>
  if (selectedWidgets.length === 1) return <InnerPropertiesPanel widgetId={selectedWidgets[0]} />
  return <div>Error</div>
})
OuterPropertiesPanel.displayName = 'OuterPropertiesPanel'

const WrappedPropertiesPanel = () => {
  return (
    <PaletteWrap title="Properties">
      <OuterPropertiesPanel />
    </PaletteWrap>
  )
}
WrappedPropertiesPanel.displayName = 'WrappedPropertiesPanel'

export default React.memo(WrappedPropertiesPanel)
