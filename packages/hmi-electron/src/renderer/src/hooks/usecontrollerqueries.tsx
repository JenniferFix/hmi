import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
// import { screen, type InsertScreenType } from '@db/schema/screen'

export function useGetControllers() {
  return useQuery({
    queryKey: ['controllers'],
    queryFn: async () => {
      const result = await database.query.controller.findMany()
      return result === undefined ? null : result
    }
  })
}
