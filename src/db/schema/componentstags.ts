import { relations } from 'drizzle-orm'
import { text, sqliteTable, foreignKey, primaryKey } from 'drizzle-orm/sqlite-core'
import { widget } from './widgets'
import { tag } from './tag'

/*
 * join table for components and the tags being used on that component
 */
export const componentsTags = sqliteTable(
  'componentsTags',
  {
    componentId: text('componentId')
      .notNull()
      .references(() => widget.id),
    tagId: text('tagId')
      .notNull()
      .references(() => tag.id)
  },
  (table) => ({
    pk: primaryKey({ columns: [table.componentId, table.tagId] })
  })
)

export const componentsTagsRelations = relations(componentsTags, ({ one }) => ({
  component: one(widget, {
    fields: [componentsTags.componentId],
    references: [widget.id]
  }),
  tag: one(tag, {
    fields: [componentsTags.tagId],
    references: [tag.id]
  })
}))

export type ComponentsTags = typeof componentsTags.$inferSelect
export type InsertComponentsTags = typeof componentsTags.$inferInsert
