import { sql, relations } from 'drizzle-orm'
import {
  index,
  integer,
  blob,
  text,
  sqliteTable,
  uniqueIndex,
  primaryKey
} from 'drizzle-orm/sqlite-core'
import { widget } from './widget'
import { propertyTemplate } from './propertytemplate'

export const property = sqliteTable(
  'property',
  {
    widgetId: text('widgetId')
      .notNull()
      .references(() => widget.id, { onDelete: 'cascade' }),
    propertyTemplateId: text('propertyTemplateId')
      .notNull()
      .references(() => propertyTemplate.id, { onDelete: 'cascade' }),
    createdAt: text('createdAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updatedAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
    data: text('data', { mode: 'json' }).$type<string | number | boolean>()
  },
  (table) => ({
    widgetIdIdx: index('widgetIdIdx').on(table.widgetId),
    propertyTemplateIdIdx: index('propertyTemplateIdIdx').on(table.propertyTemplateId),
    pk: primaryKey({ columns: [table.widgetId, table.propertyTemplateId] })
  })
)

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
