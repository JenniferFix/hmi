import { ipcMain } from 'electron'
import Database from 'better-sqlite3'
import path from 'path'
import { app } from 'electron'
import { DatabaseResult } from './../types/'

let db: Database.Database | null = null

export function initDatabase(): void {
  try {
    const dbPath = path.join(app.getPath('userData'), 'app.db')
    db = new Database(dbPath, { verbose: console.log })
    console.log('Database connected successfully at:', dbPath)
  } catch (error) {
    console.error('Database connection error:', error)
  }
}

export function closeDatabase() {
  if (db) {
    db.close()
    db = null
  }
}

// Handle database queries (SELECT operations)
ipcMain.handle('database:query', (_event, { sql, params = [] }): DatabaseResult => {
  try {
    if (!db) throw new Error('Database not initialized')
    const stmt = db.prepare(sql)
    const result = stmt.all(...params)
    return { success: true, data: result }
  } catch (error) {
    console.error('Query error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown Error' }
  }
})

// Handle database executions (INSERT, UPDATE, DELETE operations)
ipcMain.handle('database:mutate', (_event, { sql, params = [] }) => {
  try {
    if (!db) throw new Error('Database not initialized')
    const stmt = db.prepare(sql)
    const result = stmt.run(...params)
    return {
      success: true,
      data: {
        changes: result.changes,
        lastInsertRowid: result.lastInsertRowid
      }
    }
  } catch (error) {
    console.error('Mutation error:', error)
    // return { success: false, error: error.message }
    return { success: false, error: error instanceof Error ? error.message : 'Unknown Error' }
  }
})

// // Handle batch operations (transactions)
// ipcMain.handle('database:batch', (_event, operations: { sql: string; params?: any[] }[]) => {
//   try {
//     if (!db) throw new Error('Database not initialized')
//     const result = db.transaction((operations: { sql: string; params?: any[] }[]) => {
//       const results  = []
//       for (const op of operations) {
//         if (!db) throw new Error('Database not initialized')
//         const stmt = db.prepare(op.sql)
//         const res = stmt.run(...(op.params || []))
//         results.push({
//           changes: res.changes,
//           lastInsertRowid: res.lastInsertRowid
//         })
//       }
//       return results
//     })(operations)
//
//     return { success: true, data: result }
//   } catch (error) {
//     console.error('Batch operation error:', error)
//     // return { success: false, error: error.message }
//     return { success: false, error: error instanceof Error ? error.message : 'Unknown Error' }
//   }
// })
