// import { sql } from 'drizzle-orm'
import { text, sqliteTable, foreignKey } from 'drizzle-orm/sqlite-core'
import { components } from './components'
import { tags } from './tags'

export const components_tags = sqliteTable(
  'components_tags',
  {
    component_id: text('component_id').notNull(),
    tag_id: text('tag_id').notNull()
  },
  (table) => {
    return {
      pk: foreignKey({
        columns: [table.component_id, table.tag_id],
        foreignColumns: [components.id, tags.id]
      })
    }
  }
)

export type ComponentsTags = typeof components_tags.$inferSelect
export type InsertComponentsTags = typeof components_tags.$inferInsert
