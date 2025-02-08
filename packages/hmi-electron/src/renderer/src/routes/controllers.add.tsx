import { createFileRoute } from '@tanstack/react-router'
import AddControllerPage from '@renderer/components/controllereditor/ControllerAddPage'

export const Route = createFileRoute('/controllers/add')({
  component: RouteComponent
})

function RouteComponent() {
  return <AddControllerPage />
}
