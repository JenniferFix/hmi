import { sql, relations } from 'drizzle-orm'
import { text, real, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { widgetTemplate } from './widgettemplate'
import { screen } from './screen'
import { widgetsTags } from './widgetstags'
import { property } from './property'

/*
 * This is the local instance of a specific widget type
 */
export const widget = sqliteTable('widget', {
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
  widgetTemplateId: text('widgetTemplateId')
    .notNull()
    .references(() => widgetTemplate.id),
  screenId: text('screenId')
    .notNull()
    .references(() => screen.id),
  xPos: real('xPos').default(0),
  yPos: real('yPos').default(0),
  xScale: real('xScale').default(0),
  yScale: real('yScale').default(0),
  rotation: real('rotation').default(0)
})

export const widgetRelations = relations(widget, ({ one, many }) => ({
  template: one(widgetTemplate, {
    fields: [widget.widgetTemplateId],
    references: [widgetTemplate.id]
  }),
  screen: one(screen, {
    fields: [widget.screenId],
    references: [screen.id]
  }),
  widgetsTags: many(widgetsTags),
  properties: many(property)
}))

export type WidgetType = typeof widget.$inferSelect
export type InsertWidgetType = typeof widget.$inferInsert
