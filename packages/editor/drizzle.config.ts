import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema',
  out: './src/db/migrations',
  // driver: 'better-sqlite'
  verbose: true,
  strict: true,
  dbCredentials: {
    url: 'file:sqlite.db'
  }
})
