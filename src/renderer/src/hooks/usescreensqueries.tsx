import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
import { screen, type Screen, type InsertScreen } from '@db/schema/screen'
import { component } from '$/src/db/schema'

export function useGetScreens() {
  return useQuery({
    queryKey: ['screens'],
    queryFn: async () => {
      const result = await database.query.screen.findMany()
      return result
    }
  })
}

export function useGetScreen({ id }: { id: string }) {
  return useQuery({
    queryKey: ['screens', id],
    queryFn: async () => {
      // const result = await window.api.database.query('SELECT * from screens WHERE id=?', [id])
      // if (!result.success) throw new Error(result.error)
      const result = await database.query.screen.findFirst({
        where: (screen, { eq }) => eq(screen.id, id),
        with: {
          components: true
        }
      })
      return result
    }
  })
}

export function useInsertScreen() {
  const queryClient = useQueryClient()

  const mutationFn = async (data: InsertScreen) => {
    const result = await database.insert(screen).values({ name: data.name }).returning()
    return result[0]
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['screens'] })
  }

  return useMutation({ mutationFn, onSuccess })
}
