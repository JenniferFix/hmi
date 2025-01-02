import type { Config } from 'drizzle-kit'

export default {
  dialect: 'sqlite',
  schema: './src/db',
  out: './drizzle',
  // driver: 'better-sqlite'
  verbose: true,
  strict: true,
} satisfies Config
