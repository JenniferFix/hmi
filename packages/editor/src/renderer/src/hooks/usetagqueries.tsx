import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
import { eq } from 'drizzle-orm'
import {
  tag,
  type InsertTagType,
  type UpdateTagType,
  type TagType,
  type TagWithDatatype
} from '@db/schema'

export const tagKey = 'tag'

export function useGetControllerTags({ controllerId }: { controllerId: string }) {
  return useQuery({
    queryKey: ['controllerTags', controllerId],
    queryFn: async () => {
      const result = await database.query.tag.findMany({
        with: { dataType: true },
        where: (tag, { eq }) => eq(tag.controllerId, controllerId)
      })
      return result === undefined ? null : result
    }
  })
}

export function useGetTag(tagId: string) {
  return useQuery({
    queryKey: [tagKey, tagId],
    queryFn: async () => {
      return await database.query.tag.findFirst({
        where: (tag, { eq }) => eq(tag.id, tagId),
        with: { dataType: true }
      })
    }
  })
}

export function useInsertTag() {
  const queryClient = useQueryClient()
  const mutationFn = async ({ values }: { values: InsertTagType }) => {
    const result = await database.insert(tag).values(values).returning()
    return result[0]
  }
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [tagKey] })
      queryClient.invalidateQueries({ queryKey: ['controllerTags', data.controllerId] })
    }
  })
}

export function useUpdateTag() {
  const queryClient = useQueryClient()
  const mutationFn = async ({ tagId, tagData }: { tagId: string; tagData: UpdateTagType }) => {
    const result = await database.update(tag).set(tagData).where(eq(tag.id, tagId)).returning()
    return result[0]
  }
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [tagKey, data.id] })
      queryClient.invalidateQueries({ queryKey: [tagKey] })
      queryClient.invalidateQueries({ queryKey: ['controllerTags', data.controllerId] })
    }
  })
}

export function useDeleteTag() {
  const queryClient = useQueryClient()
  const mutationFn = async ({ tagId, controllerId }: { tagId: string; controllerId?: string }) => {
    await database.delete(tag).where(eq(tag.id, tagId))
    if (controllerId) return controllerId
    return null
  }
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [tagKey] })
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['controllerTags', data] })
      }
    }
  })
}
