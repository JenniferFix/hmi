import { createFileRoute } from '@tanstack/react-router'
import ConfigPage from '@renderer/components/config/ConfigPage'

export const Route = createFileRoute('/config')({
  component: RouteComponent
})

function RouteComponent() {
  return <ConfigPage />
}
