import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
import { widget, type InsertWidgetType, type WidgetType } from '@db/schema/widget'
import { eq, and } from 'drizzle-orm'
import { InsertWidget } from '@renderer/types'
import { useUpsertProperty } from './usepropertyqueries'
import { propertyTemplate } from '@db/schema'

export function useGetScreenWidgets({ screenId }: { screenId: string }) {
  return useQuery({
    queryKey: ['screenwidgets', screenId],
    queryFn: async () => {
      const result = await database.query.widget.findMany({
        where: (widget, { eq }) => eq(widget.screenId, screenId)
      })
      return result
    }
  })
}

export function useGetWidget({ id }: { id: string }) {
  return useQuery({
    queryKey: ['widgets', id],
    queryFn: async () => {
      // const result = await window.api.database.query('SELECT * from screens WHERE id=?', [id])
      // if (!result.success) throw new Error(result.error)
      const result = await database.query.widget.findFirst({
        where: (widget, { eq }) => eq(widget.id, id),
        with: {
          template: { with: { properties: { with: { dataType: true } } } },
          properties: true
        }
      })
      return result
    }
  })
}

export function useTestGetWidget() {
  return ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['widgets', id],
      queryFn: async () => {
        // const result = await window.api.database.query('SELECT * from screens WHERE id=?', [id])
        // if (!result.success) throw new Error(result.error)
        const result = await database.query.widget.findFirst({
          where: (widget, { eq }) => eq(widget.id, id),
          with: {
            template: { with: { properties: { with: { dataType: true } } } },
            properties: true
          }
        })
        return result
      }
    })
}

export function useAddWidgetToScreen() {
  const queryClient = useQueryClient()

  const mutationFn = async (data: InsertWidgetType) => {
    const result = await database
      .insert(widget)
      .values({ ...data })
      .returning()
    return result[0]
  }

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['screens', data.screenId] })
      queryClient.invalidateQueries({ queryKey: ['screenwidgets', data.screenId] })
    }
  })
}

export function useUpdateWidget() {
  const queryClient = useQueryClient()

  const mutationFn = async (data: InsertWidget) => {
    const result = await database
      .update(widget)
      .set({ ...data })
      .where(eq(widget.id, data.id))
      .returning()
    return result[0]
  }
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['widgets', data.id] })
      queryClient.invalidateQueries({ queryKey: ['screenwidgets'] })
    }
  })
}

export function useDeleteWidget() {
  const queryClient = useQueryClient()

  const mutationFn = async ({ widgetId }: { widgetId: string }) => {
    await database.delete(widget).where(eq(widget.id, widgetId))
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screenwidgets'] })
      queryClient.invalidateQueries({ queryKey: ['widgets'] })
    }
  })
}
/*
 * This will create the widget on the screen and add the props with the correct location
 */
export function useAddWidgetToScreenWithLocation() {
  const addWidget = useAddWidgetToScreen()
  const addProperty = useUpsertProperty()

  return async ({
    widgetTemplateId,
    screenId,
    posX,
    posY
  }: {
    widgetTemplateId: string
    screenId: string
    posX: number
    posY: number
  }) => {
    const newWidget = await addWidget.mutateAsync({ widgetTemplateId, screenId })
    // get posX and posY propertyTemplateIds
    const posXId = await database.query.propertyTemplate.findFirst({
      where: and(
        eq(propertyTemplate.widgetTemplateId, widgetTemplateId),
        eq(propertyTemplate.name, 'posX')
      )
    })
    const posYId = await database.query.propertyTemplate.findFirst({
      where: and(
        eq(propertyTemplate.widgetTemplateId, widgetTemplateId),
        eq(propertyTemplate.name, 'posY')
      )
    })
    if (!posXId || !posYId) throw new Error('Cannot get property id for posX or posY')
    addProperty.mutate({ widgetId: newWidget.id, propertyTemplateId: posXId.id, data: posX })
    addProperty.mutate({ widgetId: newWidget.id, propertyTemplateId: posYId.id, data: posY })
    return newWidget
  }
}

export function useSetWidgetPropertyValue() {
  const upsertProp = useUpsertProperty()
  return async ({
    widgetId,
    propName,
    value
  }: {
    widgetId: string
    propName: string
    value: any
  }) => {
    const widget = await database.query.widget.findFirst({
      where: (widget, { eq }) => eq(widget.id, widgetId),
      with: {
        template: { with: { properties: { with: { dataType: true } } } },
        properties: true
      }
    })
    if (!widget) throw new Error(`No widget with id: ${widgetId}`)
    const [propTemplate] = widget.template.properties.filter((prop) => prop.name === propName)
    upsertProp.mutate({ widgetId, propertyTemplateId: propTemplate.id, data: value })
  }
}
