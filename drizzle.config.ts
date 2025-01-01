import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  out: './drizzle',
  // driver: 'better-sqlite'
  dbCredentials: {
    url: 'file:sqlite.db'
  }
})
