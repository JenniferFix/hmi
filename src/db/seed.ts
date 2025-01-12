import { Table, getTableName, sql } from 'drizzle-orm'
import env from '@/env'
import { getDB, type DBType, getClient } from '../main/db'
import * as schema from '../db/schema'
import * as seeds from './seeds'

async function resetTable(db: DBType, table: Table) {
  // db.run(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART  IDENTITY CASCADE`))
  const tableName = getTableName(table)
  try {
    await db.run(sql.raw(`DELETE FROM ${tableName}`))
  } catch (error) {
    console.error(`Error resetting table: ${tableName}`)
  }
}

/*
 * Seed Database
 * must be done in the correct order due to foreign key references
 * delete in reverse order of seeding
 */
export async function seedDb() {
  for (const table of [
    schema.property,
    schema.propertyTemplate,
    schema.widget,
    schema.widgetTemplate,
    schema.widgetsTags,
    schema.controller,
    schema.screen,
    schema.tag,
    schema.dataType
  ]) {
    await resetTable(getDB(), table)
  }

  await seeds.datatypes(getDB())
  await seeds.componenttemplates(getDB())

  getClient().close()
}
