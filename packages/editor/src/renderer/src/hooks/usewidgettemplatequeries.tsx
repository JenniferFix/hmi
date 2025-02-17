import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
// import { screen, type ScreenType, type InsertScreenType } from '@db/schema/screen'

export function useGetComponentTemplates() {
  const queryKey = ['widgettemplates']
  const queryFn = async () => await database.query.widgetTemplate.findMany()
  return useQuery({ queryKey, queryFn })
}
