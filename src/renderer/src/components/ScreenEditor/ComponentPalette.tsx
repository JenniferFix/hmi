import React from 'react'
import { useGetComponentTemplates } from '@renderer/hooks/usecomponenttemplatequeries'

const ComponentTemplatePane = () => {
  const { data, isLoading, isError, error } = useGetComponentTemplates()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div>
      <h4>Components</h4>
      <div>{data && data.map((component) => <div key={component.id}>{component.name}</div>)}</div>
    </div>
  )
}

export default ComponentTemplatePane
