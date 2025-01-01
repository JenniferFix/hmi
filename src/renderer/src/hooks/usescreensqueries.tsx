import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import { database } from '@renderer/db'
import { screens, type Screen, type InsertScreen } from '../../../db/schema'

type InsertType = {
  name?: string
}

export async function useGetScreens() {
  return useQuery<Screen[]>({
    queryKey: ['screens'],
    queryFn: async () => {
      const result = await database.query.screens.findMany()
      return result
    }
  })
}

export function useGetScreen({ id }: { id: string }) {
  return useQuery<Screen | undefined>({
    queryKey: ['screens', id],
    queryFn: async () => {
      // const result = await window.api.database.query('SELECT * from screens WHERE id=?', [id])
      // if (!result.success) throw new Error(result.error)
      const result = await database.query.screens.findFirst({
        where: (screens, { eq }) => eq(screens.id, id)
      })
      return result
    }
  })
}

export function useInsertScreen() {
  const queryClient = useQueryClient()

  const mutationFn = async (name: string) => {
    const result = await database.insert(screens).values({ name }).returning()
    return result[0]
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['screens'] })
  }

  return useMutation({ mutationFn, onSuccess })
}
