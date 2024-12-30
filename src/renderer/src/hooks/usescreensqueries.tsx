import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

type InsertType = {
  name?: string
}

export function useGetScreens() {
  return useQuery({
    queryKey: ['screens'],
    queryFn: async () => {
      const result = await window.api.database.query('SELECT * FROM screens')
      if (!result.success) throw new Error(result.error)
      return result.data
    }
  })
}

export function useGetScreen({ id }: { id: string }) {
  return useQuery({
    queryKey: ['screens', id],
    queryFn: async () => {
      const result = await window.api.database.query('SELECT * from screens WHERE id=?', [id])
      if (!result.success) throw new Error(result.error)
      return result.data
    }
  })
}

export function useInsertScreen() {
  const queryClient = useQueryClient()

  const mutationFn = async (data: InsertType) => {
    const result = await window.api.database.mutate(
      'INSERT INTO screens (id, name) VALUES (?, ?)',
      [uuidv4(), data.name]
    )
    if (!result.success) throw new Error(result.error)
    return result.data
  }

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['screens'] })
  }

  return useMutation({ mutationFn, onSuccess })
}
