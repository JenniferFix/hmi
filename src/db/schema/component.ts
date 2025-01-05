import { sql, relations } from 'drizzle-orm'
import { text, real, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { componentTemplate } from './componenttemplate'
import { screen } from './screen'
import { componentsTags } from './componentstags'

/*
 * This is the local instance of a specific component type
 */
export const component = sqliteTable('component', {
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
  screenId: text('screenId')
    .notNull()
    .references(() => screen.id),
  xPos: real('xPos').default(0),
  yPos: real('yPos').default(0),
  xScale: real('xScale').default(0),
  yScale: real('yScale').default(0),
  rotation: real('rotation').default(0)
})

export const componentRelations = relations(component, ({ one, many }) => ({
  componentTemplate: one(componentTemplate, {
    fields: [component.componentTemplateId],
    references: [componentTemplate.id]
  }),
  screen: one(screen, {
    fields: [component.screenId],
    references: [screen.id]
  }),
  componentsTags: many(componentsTags)
}))

export type Component = typeof component.$inferSelect
export type InsertComponent = typeof component.$inferInsert
