import React from 'react'

const NodeRedEditor = () => {
  return (
    <webview
      src="http://localhost:1880/red"
      className="w-full h-full"
      nodeintegration="true"
      webpreferences="contextIolation=false"
    />
  )
}

export default NodeRedEditor
