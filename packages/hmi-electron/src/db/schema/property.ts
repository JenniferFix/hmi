import { sql, relations } from 'drizzle-orm'
import { blob, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { widget } from './widget'
import { propertyTemplate } from './propertytemplate'

/*
 * the set values of each widgets properties
 */
export const property = sqliteTable('property', {
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
  widgetId: text('widgetId')
    .notNull()
    .references(() => widget.id),
  propertyTemplateId: text('propertyTemplateId')
    .notNull()
    .references(() => propertyTemplate.id),
  data: blob('data')
})

export const propertyRelations = relations(property, ({ one }) => ({
  widget: one(widget, {
    fields: [property.widgetId],
    references: [widget.id]
  }),
  propertyTemplate: one(propertyTemplate, {
    fields: [property.propertyTemplateId],
    references: [propertyTemplate.id]
  })
}))

export type PropertyType = typeof property.$inferSelect
export type InsertPropertyType = typeof property.$inferInsert
