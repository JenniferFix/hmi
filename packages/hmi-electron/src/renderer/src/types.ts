import { WidgetType } from '$/src/db/schema/widget'

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type InsertWidget = Omit<WithRequired<Partial<WidgetType>, 'id'>, 'createdAt' | 'updatedAt'>

export type EditDragData =
  | {
      type: 'widgetTemplate'
      id: string
      name: string
    }
  | {
      type: 'widget'
      id: string
      xOffset: number
      yOffset: number
    }
