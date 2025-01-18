import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
import { widget, type InsertWidgetType } from '@db/schema/widget'
import { eq } from 'drizzle-orm'

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
