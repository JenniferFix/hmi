import { sql, relations } from 'drizzle-orm'
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { tag } from './tag'

/*
 * controller information table
 */
export const controller = sqliteTable('controller', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  name: text('name'),
  description: text('description'),
  type: text('type'),
  ip: text('ip').unique(),
  slot: integer('slot').notNull().default(0),
  rpi: integer('rpi').notNull().default(50)
})

export const controllerRelations = relations(controller, ({ many }) => ({
  tags: many(tag)
}))

export type ControllerType = typeof controller.$inferSelect
export type InsertControllerType = typeof controller.$inferInsert
