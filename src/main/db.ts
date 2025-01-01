// import { drizzle } from 'drizzle-orm/better-sqlite3'
import { drizzle } from 'drizzle-orm/libsql'
import Database from 'better-sqlite3'
// import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { migrate } from 'drizzle-orm/libsql/migrator'
import * as schema from '../db/schema'
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
    // sqlite = new Database(dbPath, { verbose: console.log })
    // sqlite.pragma('journal_mode = WAL')
    // sqlite.pragma('foreign_keys = ON')
    client = createClient({
      url: `file:${dbPath}`
    })
    db = drizzle(client, { schema })
    console.log('initdb')
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
  console.log('trying', sql, args)
  if (!client || !db) throw new Error('Database not initialized')
  // const result = sqlite.prepare(sqlstr)
  try {
    const result = await client.execute({ sql, args })
    return result.rows
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
