import React from 'react'
import { useGetScreen } from '@renderer/hooks/usescreensqueries'
import {
  useGetScreenWidgets,
  useAddWidgetToScreen,
  useUpdateWidget
} from '@renderer/hooks/usewidgetqueries'
import Widget from '@renderer/components/ScreenEditor/Widget'
import { useEditorStore } from '@renderer/store'

const Screen = ({ screenId }: { screenId: string }) => {
  const clearSelectedWidgets = useEditorStore((state) => state.clearSelection)
  const setSelected = useEditorStore((state) => state.setSelected)
  const {
    data: screenData,
    isLoading: screenIsLoading,
    isError: screenIsError,
    error: screenError
  } = useGetScreen({ id: screenId })
  const {
    data: widgetData,
    isLoading: widgetIsLoading,
    isError: widgetIsError,
    error: widgetError
  } = useGetScreenWidgets({ screenId })
  const addWidget = useAddWidgetToScreen()
  const updateWidget = useUpdateWidget()
  if (screenIsLoading || widgetIsLoading) return <div>loading...</div>
  if (screenIsError || widgetIsError)
    return (
      <div>
        Error: {screenError?.message}
        {widgetError?.message}
      </div>
    )

  const handleDragEnter: React.DragEventHandler<HTMLElement> = (e) => {
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragOver: React.DragEventHandler<HTMLElement> = (e) => {
    // console.log('dragOver', e)
    e.dataTransfer.dropEffect = 'move'
  }

  const validImageTypes: string[] = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/svg+xml'
  ]

  const handleDrop: React.DragEventHandler<HTMLElement> = async (e: React.DragEvent) => {
    e.preventDefault()
    // console.log('drop', e)
    // console.log('items:', e.dataTransfer.items)
    // console.log('items.length', e.dataTransfer.items.length)
    // console.log('types.length', e.dataTransfer.types.length)
    // console.log('files', e.dataTransfer.files)

    Array.from(e.dataTransfer.items).forEach(async (item) => {
      console.log('item:', item.kind, item.type)
      // handle files
      if (item.kind === 'file') {
        console.log('file:', item.getAsFile())
        const file = item.getAsFile()
        console.log('file type', file?.type)
      }
      if (item.kind === 'string') {
        //
        if (item.type === 'application/json') {
          const jsondata = e.dataTransfer.getData('application/json')
          const dropData = JSON.parse(jsondata)

          console.log('dropdata', dropData)

          if (!dropData.type) return

          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          switch (dropData.type) {
            case 'widget':
              // move widget, set new x and y
              updateWidget.mutate({
                id: dropData.id,
                xPos: x - dropData.xOffset,
                yPos: y - dropData.yOffset
              })
              break
            case 'widgetTemplate':
              const newWidget = await addWidget.mutateAsync({
                screenId,
                widgetTemplateId: dropData.id,
                xPos: x,
                yPos: y
              })
              setSelected(newWidget.id)
              break
            default:
              throw new Error(`Invalid drop type: ${dropData.type}`)
          }
        }
      }
    })
  }

  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    clearSelectedWidgets()
  }

  return (
    <div
      className="absolute inset-0"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {widgetData && widgetData.map((widget) => <Widget widgetId={widget.id} key={widget.id} />)}
    </div>
  )
}

export default Screen
