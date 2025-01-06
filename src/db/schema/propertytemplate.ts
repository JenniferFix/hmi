import { sql, relations } from 'drizzle-orm'
import { blob, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { componentTemplate } from './componenttemplate'
import { dataType } from './datatype'

/*
 * The property template attached to the component template
 */
export const propertyTemplate = sqliteTable('propertyTemplate', {
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
  componentTemplateId: text('componentTemplateId')
    .notNull()
    .references(() => componentTemplate.id),
  dataTypeId: text('dataTypeId')
    .notNull()
    .references(() => dataType.id),
  default: blob('default')
})

export const propertyTemplateRelations = relations(propertyTemplate, ({ one }) => ({
  componentTemplate: one(componentTemplate, {
    fields: [propertyTemplate.componentTemplateId],
    references: [componentTemplate.id]
  }),
  dataType: one(dataType, {
    fields: [propertyTemplate.dataTypeId],
    references: [dataType.id]
  })
}))

export type ComponentType = typeof propertyTemplate.$inferSelect
export type InsertComponentType = typeof propertyTemplate.$inferInsert
