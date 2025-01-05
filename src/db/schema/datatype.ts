import { sql } from 'drizzle-orm'
import { text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'

/*
 * table of data types to be use. can be added to later but will be initlally seeded into the database
 */
export const dataType = sqliteTable('dataType', {
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
  typescriptType: text('typescriptType')
})

export type ComponentType = typeof dataType.$inferSelect
export type InsertComponentType = typeof dataType.$inferInsert
