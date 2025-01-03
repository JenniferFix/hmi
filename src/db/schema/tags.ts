import { sql } from 'drizzle-orm'
import { text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { controllers } from './controllers'

export const tags = sqliteTable('tags', {
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
  name: text('name').notNull().default(''),
  controller_id: text('controller.id').references(() => controllers.id),
  data_type: text('data_type'),
  value: text('value')
})

export type Tag = typeof tags.$inferSelect
export type InsertTag = typeof tags.$inferInsert
