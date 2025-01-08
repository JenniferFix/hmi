import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
import { screen, type Screen, type InsertScreen } from '@db/schema/screen'
import { component } from '$/src/db/schema'

export function useGetComponentTemplates() {
  const queryKey = ['componenttemplates']
  const queryFn = async () => await database.query.componentTemplate.findMany()
  return useQuery({ queryKey, queryFn })
}
