import { sql } from 'drizzle-orm'
import { text, real, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { component_types } from './component_types'

export const components = sqliteTable('components', {
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
  component_type_id: text('component_type_id')
    .notNull()
    .references(() => component_types.id),
  x_pos: real('x_pos').default(0),
  y_pos: real('y_pos').default(0),
  x_scale: real('x_scale').default(0),
  y_scale: real('y_scale').default(0),
  rotation: real('rotation').default(0)
})

export type Component = typeof components.$inferSelect
export type InsertComponent = typeof components.$inferInsert
