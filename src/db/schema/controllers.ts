import { sql } from 'drizzle-orm'
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'

export const controllers = sqliteTable('controllers', {
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
  type: text('type').notNull(),
  ip: text('ip').unique(),
  slot: integer('slot').notNull().default(0)
})

export type Controller = typeof controllers.$inferSelect
export type InsertController = typeof controllers.$inferInsert
