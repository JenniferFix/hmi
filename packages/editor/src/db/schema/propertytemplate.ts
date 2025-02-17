import { sql, relations } from 'drizzle-orm'
import { blob, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { widgetTemplate } from './widgettemplate'
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
  name: text('name').notNull(),
  description: text('description'),
  widgetTemplateId: text('widgetTemplateId')
    .notNull()
    .references(() => widgetTemplate.id, { onDelete: 'cascade' }),
  dataTypeId: text('dataTypeId')
    .notNull()
    .references(() => dataType.id),
  default: text('default', { mode: 'json' })
})

export const propertyTemplateRelations = relations(propertyTemplate, ({ one }) => ({
  widgetTemplate: one(widgetTemplate, {
    fields: [propertyTemplate.widgetTemplateId],
    references: [widgetTemplate.id]
  }),
  dataType: one(dataType, {
    fields: [propertyTemplate.dataTypeId],
    references: [dataType.id]
  })
}))

export type PropertyTemplateType = typeof propertyTemplate.$inferSelect
export type InsertPropertyTemplateType = typeof propertyTemplate.$inferInsert
