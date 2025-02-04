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
import { useGetWidgetProperty, useUpsertProperty } from '@renderer/hooks/usepropertyqueries'
import PropertyInput from './PropertyInput'
import { type PropertyTemplateType, type DataTypeType } from '@db/schema'

type TypeMap = {
  string: string
  number: number
  boolean: boolean
}

function convert<T extends keyof TypeMap>(type: T, value: string): TypeMap[T] {
  switch (type) {
    case 'string':
      return value as TypeMap[T]
    case 'number':
      return Number(value) as TypeMap[T]
    case 'boolean':
      return (value === 'true') as TypeMap[T]
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

const PropertyRow = ({
  widgetId,
  propTemplate,
  dataType
}: {
  widgetId: string
  propTemplate: PropertyTemplateType
  dataType: DataTypeType
}) => {
  const { data, isLoading, isError, error } = useGetWidgetProperty({
    widgetId,
    propertyTemplateId: propTemplate.id
  })
  const [clicked, setClicked] = React.useState(false)

  const handleClicked = React.useCallback(() => {
    if (!clicked) setClicked(true)
  }, [clicked, setClicked])

  if (isLoading) return null
  // if (isError) return null
  // if (!data) throw new Error(`Error no data`)

  return (
    <TableRow>
      <TableCell>{propTemplate.name}</TableCell>
      <TableCell className="w-full" onClick={handleClicked}>
        {dataType.typescriptType === 'string' && (data?.data as string)}
        {dataType.typescriptType === 'number' &&
          (clicked ? (
            <PropertyInput widgetId={widgetId} propertyTemplateId={propTemplate.id} />
          ) : (
            <NumberSpinner
              key={`${data?.data ?? propTemplate.default}`}
              axis="x"
              initialValue={convert<'number'>(
                'number',
                data?.data !== undefined
                  ? String(data.data)
                  : propTemplate.default !== undefined
                    ? String(propTemplate.default)
                    : '0'
              )}
              widgetId={widgetId}
              // propertyTemplateId={data.template.properties.filter((p) => p.name === prop.name)[0].id}
              propertyTemplateId={propTemplate.id}
            />
          ))}
      </TableCell>
    </TableRow>
  )
}

const InnerPropertiesPanel = React.memo(({ widgetId }: { widgetId: string }) => {
  const { data, isLoading, isError, error } = useGetWidget({ id: widgetId })
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error?.message}</div>
  if (!data) return <div>noData</div>

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
          {data.template.properties.map((prop) => {
            return (
              <PropertyRow
                key={prop.id}
                widgetId={widgetId}
                propTemplate={prop}
                dataType={prop.dataType}
              />
            )
          })}
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
