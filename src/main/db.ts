import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import * as schema from '../db/schema'
import fs from 'fs'
import { app } from 'electron'
import path from 'path'

const dbPath = import.meta.env.DEV ? 'sqlite.db' : path.join(app.getPath('userData'), 'data.db')

fs.mkdirSync(path.dirname(dbPath), { recursive: true })

let db: ReturnType<typeof drizzle<typeof schema>> | null = null
let sqlite: Database.Database | null = null

export function getDB() {
  if (!db) throw new Error('Database not initialized')
  return db
}

export async function initialize() {
  try {
    sqlite = new Database(dbPath, { verbose: console.log })
    sqlite.pragma('journal_mode = WAL')
    // sqlite.pragma('foreign_keys = ON')
    db = drizzle(sqlite, { schema })
  } catch (error) {
    console.error('Failed to initialize db', error)
    throw error
  }
}

export function close() {
  try {
    if (sqlite) {
      sqlite.close()
      sqlite = null
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

export const execute = async (_e, sqlstr, params, method) => {
  if (!sqlite || !db) throw new Error('Database not initialized')
  const result = sqlite.prepare(sqlstr)
  const ret = result[method](...params)
  return toDrizzleResult(ret)
}

export const runMigrate = async () => {
  if (!db) throw new Error('Database not initialzed')
  migrate(db, {
    migrationsFolder: path.join(__dirname, '../../drizzle')
  })
}
