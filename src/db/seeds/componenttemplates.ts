import { type DBType } from '@/main/db'
import components from './data/componenttemplate.json'
import * as schema from '../schema'
import { eq } from 'drizzle-orm'

export default async function seed(db: DBType) {
  await Promise.all(
    components.map(async (component) => {
      const [insertedComponentTemplate] = await db
        .insert(schema.componentTemplate)
        .values({ ...components })
        .returning()
      await Promise.all(
        component.properties.map(async (propertyTemplate) => {
          const foundDataType = await db.query.dataType.findFirst({
            where: eq(schema.dataType.name, propertyTemplate.dataType)
          })
          if (!foundDataType)
            throw new Error(`No data type found with this name: ${propertyTemplate.dataType}`)
          await db.insert(schema.propertyTemplate).values({
            ...propertyTemplate,
            componentTemplateId: insertedComponentTemplate.id,
            dataTypeId: foundDataType.id
          })
        })
      )
    })
  )
}
