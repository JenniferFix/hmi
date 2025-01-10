// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { Tree, type NodeRendererProps } from 'react-arborist'
import { FolderIcon, FolderOpenIcon, MonitorIcon, Monitor, Puzzle } from 'lucide-react'
import useResizeObserver from 'use-resize-observer'

type NodeType = {
  id: string
  name: string
  children?: NodeType[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
const ScreenTree = () => {
  const { ref, width, height } = useResizeObserver()

  const data: NodeType[] = [
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
      <Tree initialData={data} width={width} height={height}>
        {Node}
      </Tree>
    </div>
  )
}

export default ScreenTree
