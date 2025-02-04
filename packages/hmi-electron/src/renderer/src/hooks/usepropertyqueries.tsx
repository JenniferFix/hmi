import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { database } from '@renderer/db'
import { property, type InsertPropertyType } from '@db/schema/property'

export function useGetWidgetProperty({
  widgetId,
  propertyTemplateId
}: {
  widgetId: string
  propertyTemplateId: string
}) {
  return useQuery({
    queryKey: ['widgetProperty', widgetId, propertyTemplateId],
    queryFn: async () => {
      const result = await database.query.property.findFirst({
        where: (property, { eq, and }) =>
          and(eq(property.widgetId, widgetId), eq(property.propertyTemplateId, propertyTemplateId)),
        with: { propertyTemplate: { with: { dataType: true } } }
      })
      return result ?? null
    },
    retry: false
  })
}

export function useUpsertProperty() {
  const queryClient = useQueryClient()
  const mutationFn = async (insertData: InsertPropertyType) => {
    const result = await database
      .insert(property)
      .values(insertData)
      .onConflictDoUpdate({
        target: [property.widgetId, property.propertyTemplateId],
        set: { data: insertData.data }
      })
      .returning()
    return result[0]
  }
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['widgets', data.widgetId] })
      queryClient.invalidateQueries({
        queryKey: ['widgetProperty', data.widgetId, data.propertyTemplateId]
      })
    }
  })
}
