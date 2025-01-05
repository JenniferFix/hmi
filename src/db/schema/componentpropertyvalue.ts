import { sql, relations } from 'drizzle-orm'
import { blob, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { component } from './component'
import { componentPropertyTemplate } from './componentpropertytemplate'

/*
 * the set values of each components properties
 */
export const componentProperyValue = sqliteTable('componentPropertyValue', {
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
    .references(() => componentPropertyTemplate.id),
  data: blob('data')
})

export const componentPropertyValueRelations = relations(componentProperyValue, ({ one }) => ({
  component: one(component, {
    fields: [componentProperyValue.componentId],
    references: [component.id]
  }),
  componentPropertyTemplate: one(componentPropertyTemplate, {
    fields: [componentProperyValue.componentPropertyTemplateId],
    references: [componentPropertyTemplate.id]
  })
}))

export type ComponentType = typeof componentProperyValue.$inferSelect
export type InsertComponentType = typeof componentProperyValue.$inferInsert
