import { sql, relations } from 'drizzle-orm'
import { blob, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { component } from './component'
import { propertyTemplate } from './propertytemplate'

/*
 * the set values of each components properties
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
  componentId: text('componentId')
    .notNull()
    .references(() => component.id),
  componentPropertyTemplateId: text('componentPropertyTemplateId')
    .notNull()
    .references(() => propertyTemplate.id),
  data: blob('data')
})

export const propertyRelations = relations(property, ({ one }) => ({
  component: one(component, {
    fields: [property.componentId],
    references: [component.id]
  }),
  componentPropertyTemplate: one(propertyTemplate, {
    fields: [property.componentPropertyTemplateId],
    references: [propertyTemplate.id]
  })
}))

export type ComponentType = typeof property.$inferSelect
export type InsertComponentType = typeof property.$inferInsert
