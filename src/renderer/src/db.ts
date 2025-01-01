import { drizzle } from 'drizzle-orm/sqlite-proxy'
import * as schema from '../../db/schema'

export const database = drizzle(
  async (...args) => {
    try {
      console.log('Executing query with args: ', args)
      // @ts-expect-error
      const result = await window.api.execute(...args)
      console.log('results from window.api.execute', result)
      return { rows: result }
    } catch (e: any) {
      console.error('Error from sqlite proxy server: ', e.response.data)
      // throw new Error('Error from sqlite proxy:', e.response.data)
      throw e
      // return { rows: [] }
    }
  },
  {
    schema: schema
  }
)
