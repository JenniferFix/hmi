import { type DBType } from '@/main/db'
import widgets from './data/widgettemplate.json'
import * as schema from '../schema'
import { eq } from 'drizzle-orm'

export default async function seed(db: DBType) {
  await Promise.all(
    widgets.map(async (component) => {
      const [insertedWidgetTemplate] = await db
        .insert(schema.widgetTemplate)
        .values({ ...component })
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
            widgetTemplateId: insertedWidgetTemplate.id,
            dataTypeId: foundDataType.id
          })
        })
      )
    })
  )
}
