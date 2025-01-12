import { sql, relations } from 'drizzle-orm'
import { text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { widget } from './widget'

/*
 * the basic screen object. there is a lot to be added in terms of properties
 * but will added as needed
 * this will have multiple components added to it
 */
export const screen = sqliteTable('screen', {
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
  description: text('description')
})

export const screenRelations = relations(screen, ({ many }) => ({
  widgets: many(widget)
}))

export type ScreenType = typeof screen.$inferSelect
export type InsertScreenType = typeof screen.$inferInsert
