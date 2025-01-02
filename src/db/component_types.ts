import { sql } from 'drizzle-orm'
import { text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'

export const component_types = sqliteTable('component_types', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  created_at: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  name: text('name').notNull().default('')
})

export type ComponentType = typeof component_types.$inferSelect
export type InsertComponentType = typeof component_types.$inferInsert
