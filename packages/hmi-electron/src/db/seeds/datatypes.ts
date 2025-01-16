import { type DBType } from '@/main/db'
import datatypes from './data/datatype.json'
import { dataType } from '@/db/schema'

export default async function seed(db: DBType) {
  await db.insert(dataType).values(datatypes)
}
