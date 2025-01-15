import React from 'react'
import { Tree, type NodeRendererProps } from 'react-arborist'
import { FolderIcon, FolderOpenIcon, MonitorIcon, Monitor, Puzzle } from 'lucide-react'
import useResizeObserver from 'use-resize-observer'
import { useParams } from '@tanstack/react-router'
import { useGetScreenWidgets } from '@renderer/hooks/usewidgetqueries'
import { useGetScreen } from '@renderer/hooks/usescreensqueries'
import PaletteWrap from './PaletteWrap'

type NodeType = {
  id: string
  name: string
  children?: NodeType[]
}

function Node({ node, style, dragHandle }: NodeRendererProps<NodeType>) {
  return (
    <div style={style} ref={dragHandle} className="text-md">
      <span className="inline-block whitespace-nowrap">
        {node.isInternal ? (
          <Monitor size={16} className="inline" />
        ) : (
          <Puzzle size={16} className="inline" />
        )}
        &nbsp;{node.data.name}
      </span>
    </div>
  )
}

const ScreenTree = ({ screenId }: { screenId: string }) => {
  const { ref, width, height } = useResizeObserver()
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
  if (widgetIsLoading || screenIsLoading) return <div>Loading</div>
  if (widgetIsError || screenIsError)
    return (
      <div>
        Error{widgetError?.message}
        {screenError?.message}
      </div>
    )
  // if (!widgetData) throw new Error('No Widget Data')
  // if (!screenData) throw new Error('No Screen Data')

  const nodedata: NodeType[] = [
    { id: '1', name: 'Application' },
    {
      id: '2',
      name: 'Screen Title',
      children: [
        { id: 'c1', name: 'Component1' },
        { id: 'c2', name: 'Component2' }
      ]
    }
  ]
  return (
    <div className="absolute inset-0" ref={ref}>
      <Tree initialData={nodedata} width={width} height={height}>
        {Node}
      </Tree>
    </div>
  )
}

const WrappedScreenTree = () => {
  const params = useParams({ strict: false })
  return (
    <PaletteWrap title="Treeview">
      <ScreenTree screenId={params?.screenId || ''} />
    </PaletteWrap>
  )
}

export default WrappedScreenTree
