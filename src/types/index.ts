export interface DatabaseResult {
  success: boolean
  data?: any
  error?: string
}

export interface IDatabase {
  query: (sql: string, params?: any[]) => Promise<DatabaseResult>
  mutate: (sql: string, params?: any[]) => Promise<DatabaseResult>
  batch: (operations: { sql: string; params?: any[] }[]) => Promise<DatabaseResult>
}
