import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import * as schema from '../db'
import fs from 'fs'
import { app } from 'electron'
import path from 'path'
import { createClient } from '@libsql/client'

const dbPath = import.meta.env.DEV ? 'sqlite.db' : path.join(app.getPath('userData'), 'data.db')

fs.mkdirSync(path.dirname(dbPath), { recursive: true })

let db: ReturnType<typeof drizzle<typeof schema>> | null = null
// let sqlite: Database.Database | null = null
let client: ReturnType<typeof createClient> | null = null
// let client: any | null = null

export function getDB() {
  if (!db) throw new Error('Database not initialized')
  return db
}

export async function initialize() {
  try {
    client = createClient({
      url: `file:${dbPath}`
    })
    db = drizzle(client, { schema })
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
function toDrizzleResult(row: Record<string, any>)
function toDrizzleResult(rows: Record<string, any> | Array<Record<string, any>>) {
  if (!rows) {
    return []
  }
  if (Array.isArray(rows)) {
    return rows.map((row) => {
      return Object.keys(row).map((key) => row[key])
    })
  } else {
    return Object.keys(rows).map((key) => rows[key])
  }
}

export const execute = async (_e, sql, args, method) => {
  if (!client || !db) throw new Error('Database not initialized')
  // const result = sqlite.prepare(sqlstr)
  try {
    const result = await client.execute({ sql, args })
    // return result.rows
    return toDrizzleResult(result.rows)
  } catch (error) {
    console.error('Execute error:', error, sql, args)
    throw error
  }
  // const ret = result[method](...params)
  // return toDrizzleResult(ret)
}

export const runMigrate = async () => {
  if (!db) throw new Error('Database not initialized')
  migrate(db, {
    migrationsFolder: path.join(__dirname, '../../drizzle')
  })
}
