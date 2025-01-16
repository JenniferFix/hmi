import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import * as schema from '../db/schema'
import fs from 'fs'
import { app } from 'electron'
import path from 'path'
import { createClient } from '@libsql/client'

const dbPath = import.meta.env.DEV ? 'sqlite.db' : path.join(app.getPath('userData'), 'data.db')

fs.mkdirSync(path.dirname(dbPath), { recursive: true })

export type DBType = ReturnType<typeof drizzle<typeof schema>>

let db: DBType | null = null
// let sqlite: Database.Database | null = null
let client: ReturnType<typeof createClient> | null = null
// let client: any | null = null

export function getDB() {
  if (!db) throw new Error('Database not initialized')
  return db
}

export function getClient() {
  if (!client) throw new Error('Database not initialized')
  return client
}

export async function initialize() {
  try {
    client = createClient({
      url: `file:${dbPath}`
    })
    db = drizzle(client, { schema, logger: true })
    console.log('Initialized Database at: ', dbPath)
  } catch (error) {
    console.error('Failed to initialize db', error)
    throw error
  }
}

export function close() {
  try {
    if (client) {
      client.close()
      client = null
      db = null
    }
  } catch (error) {
    console.error('Error closing db', error)
    throw error
  }
}

export const execute = async (_e, sql, args, method) => {
  if (!client || !db) throw new Error('Database not initialized')
  try {
    const result = await client.execute({ sql, args })
    if (method === 'get') {
      if (result.rows.length === 0 || !result.rows[0]) {
        return {}
      }
      return Object.keys(result.rows[0]).map((key) => result.rows[0][key])
    } else if (method === 'all') {
      return result.rows.map((row) => {
        return Object.keys(row).map((key) => row[key])
      })
    }
  } catch (error) {
    console.error('Execute error:', error, sql, args)
    throw error
  }
}

export const runMigrate = async () => {
  if (!db) throw new Error('Database not initialized')
  migrate(db, {
    migrationsFolder: path.join(__dirname, '../../drizzle')
  })
}
