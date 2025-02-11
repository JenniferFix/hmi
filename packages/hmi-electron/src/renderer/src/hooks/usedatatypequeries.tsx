import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
import { eq } from 'drizzle-orm'
import { tag, type InsertTagType, type UpdateTagType } from '@db/schema'

export const datatypeKey = 'datatype'

export const useGetDatatypes = () => {
  return useQuery({
    queryKey: [datatypeKey],
    queryFn: async () => {
      return await database.query.dataType.findMany()
    }
  })
}
