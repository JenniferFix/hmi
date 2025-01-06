import { Table, getTableName, sql } from 'drizzle-orm'
import env from '@/env'
import { getDB, type DBType } from '../main/db'
import * as schema from '../db/schema'
import * as seeds from './seeds'

const localdb = getDB()

async function resetTable(db: DBType, table: Table) {
  db.run(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART  IDENTITY CASCADE`))
}

// Delete everything
for (const table of [
  schema.component,
  schema.componentTemplate,
  schema.componentsTags,
  schema.controller,
  schema.dataType,
  schema.property,
  schema.propertyTemplate,
  schema.screen,
  schema.tag
]) {
  await resetTable(getDB(), table)
}

await seeds.datatypes(localdb)
// await seeds.componenttemplates(localdb)
