import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
import { eq } from 'drizzle-orm'
import { controller, type InsertControllerType, type UpdateControllerType } from '@db/schema'

export const controllerKey = 'controller'

export function useGetControllers() {
  return useQuery({
    queryKey: [controllerKey],
    queryFn: async () => {
      const result = await database.query.controller.findMany()
      return result === undefined ? null : result
    }
  })
}

export function useGetController(controllerId: string) {
  return useQuery({
    queryKey: [controllerKey, controllerId],
    queryFn: async () => {
      return await database.query.controller.findFirst({
        where: (controller, { eq }) => eq(controller.id, controllerId),
        with: { tags: { with: { dataType: true } } }
      })
    }
  })
}

export function useInsertController() {
  const queryClient = useQueryClient()
  const mutationFn = async (insertData: InsertControllerType) => {
    const result = await database.insert(controller).values(insertData).returning()
    return result[0]
  }
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [controllerKey] })
    }
  })
}

export function useUpdateController() {
  const queryClient = useQueryClient()
  const mutationFn = async ({
    controllerId,
    controllerData
  }: {
    controllerId: string
    controllerData: UpdateControllerType
  }) => {
    const result = await database
      .update(controller)
      .set(controllerData)
      .where(eq(controller.id, controllerId))
      .returning()
    return result[0]
  }
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [controllerKey, data.id] })
      queryClient.invalidateQueries({ queryKey: [controllerKey] })
    }
  })
}

export function useDeleteController() {
  const queryClient = useQueryClient()
  const mutationFn = async ({ controllerId }: { controllerId: string }) => {
    await database.delete(controller).where(eq(controller.id, controllerId))
  }
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [controllerKey] })
    }
  })
}
