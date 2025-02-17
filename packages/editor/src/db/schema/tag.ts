import { sql, relations } from 'drizzle-orm'
import { text, sqliteTable, index, unique, uniqueIndex, primaryKey } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { controller } from './controller'
import { dataType } from './datatype'
import { widgetsTags } from './widgetstags'
import { createInsertSchema, createUpdateSchema, createSelectSchema } from 'drizzle-zod'

/*
 * the tags for the controller. each tag can only have one controller
 *
 */
export const tag = sqliteTable(
  'tag',
  {
    id: text('id').$defaultFn(() => uuidv4()),
    createdAt: text('createdAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updatedAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
    name: text('name').notNull().default(''),
    description: text().default(''),
    controllerId: text('controllerId')
      .notNull()
      .references(() => controller.id),
    dataTypeId: text('dataTypeId')
      .notNull()
      .references(() => dataType.id),
    program: text('program').default(''),
    value: text('value')
  },
  (table) => [
    primaryKey({ columns: [table.controllerId, table.name] }),
    uniqueIndex('id').on(table.id),
    index('name').on(table.name)
  ]
)

export const tagRelations = relations(tag, ({ one, many }) => ({
  controller: one(controller, {
    fields: [tag.controllerId],
    references: [controller.id]
  }),
  dataType: one(dataType, {
    fields: [tag.dataTypeId],
    references: [dataType.id]
  }),
  widgetsTags: many(widgetsTags)
}))

export type TagType = typeof tag.$inferSelect
export type InsertTagType = typeof tag.$inferInsert
export type UpdateTagType = Partial<Omit<InsertTagType, 'id' | 'createdAt' | 'updatedAt'>>
export const tagSelectSchema = createSelectSchema(tag)
export const tagUpdateSchema = createUpdateSchema(tag)
export const tagInsertSchema = createInsertSchema(tag)
