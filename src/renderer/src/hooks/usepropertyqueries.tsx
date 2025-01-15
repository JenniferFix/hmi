import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
import { widget, type InsertWidgetType } from '@db/schema/widget'
import { property } from '$/src/db/schema'

export function useGetWidgetProperty({
  widgetId,
  propertyTemplateId
}: {
  widgetId: string
  propertyTemplateId: string
}) {
  return useQuery({
    queryKey: ['widgetproperty', widgetId, propertyTemplateId],
    queryFn: async () => {
      const result = await database.query.property.findFirst({
        where: (property, { eq, and }) =>
          and(eq(property.widgetId, widgetId), eq(property.propertyTemplateId, propertyTemplateId))
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
