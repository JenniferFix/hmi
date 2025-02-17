import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/controllers/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Add an new controller or select controller to see details</div>
}
