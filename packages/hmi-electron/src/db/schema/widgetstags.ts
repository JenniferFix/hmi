import { relations } from 'drizzle-orm'
import { text, sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core'
import { widget } from './widget'
import { tag } from './tag'

/*
 * join table for widgets and the tags being used on that widget
 */
export const widgetsTags = sqliteTable(
  'widgetsTags',
  {
    widgetId: text('widgetId')
      .notNull()
      .references(() => widget.id),
    tagId: text('tagId')
      .notNull()
      .references(() => tag.id)
  },
  (table) => ({
    pk: primaryKey({ columns: [table.widgetId, table.tagId] })
  })
)

export const widgetsTagsRelations = relations(widgetsTags, ({ one }) => ({
  widget: one(widget, {
    fields: [widgetsTags.widgetId],
    references: [widget.id]
  }),
  tag: one(tag, {
    fields: [widgetsTags.tagId],
    references: [tag.id]
  })
}))

export type WidgetsTagsType = typeof widgetsTags.$inferSelect
export type InsertWidgetsTagsType = typeof widgetsTags.$inferInsert
