import { sql, relations } from 'drizzle-orm'
import { text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { componentPropertyTemplate } from './componentpropertytemplate'

/*
 * the generic components that will be used. These will show up in the component palette
 * this will be seeded to begin the dataabase with defaults but custom components
 * can be added afterwards
 */
export const componentTemplate = sqliteTable('componentTemplate', {
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

export const componentTemplateRelations = relations(componentTemplate, ({ many }) => ({
  componentProperties: many(componentPropertyTemplate)
}))

export type ComponentType = typeof componentTemplate.$inferSelect
export type InsertComponentType = typeof componentTemplate.$inferInsert
