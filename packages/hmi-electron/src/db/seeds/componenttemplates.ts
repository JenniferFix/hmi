import { type DBType } from '@/main/db'
import widgets from './data/widgettemplate.json'
import * as schema from '../schema'
import { eq } from 'drizzle-orm'
import defaultProps from './data/widgetdefaultprops.json'

export default async function seed(db: DBType) {
  await Promise.all(
    widgets.map(async (component) => {
      const [insertedWidgetTemplate] = await db
        .insert(schema.widgetTemplate)
        .values({ ...component })
        .returning()
      await Promise.all([
        ...Object.keys(defaultProps).map(async (propName) => {
          const foundDataType = await db.query.dataType.findFirst({
            where: eq(schema.dataType.name, defaultProps[propName].dataType)
          })
          if (!foundDataType)
            throw new Error(`No data type found with this name: ${defaultProps[propName].dataType}`)
          await db.insert(schema.propertyTemplate).values({
            name: propName,
            ...defaultProps[propName],
            widgetTemplateId: insertedWidgetTemplate.id,
            dataTypeId: foundDataType.id
          })
        }),
        ...Object.keys(component.properties).map(async (propName) => {
          const foundDataType = await db.query.dataType.findFirst({
            where: eq(schema.dataType.name, component.properties[propName].dataType)
          })
          if (!foundDataType)
            throw new Error(
              `No data type found with this name: ${component.properties[propName].dataType}`
            )
          await db.insert(schema.propertyTemplate).values({
            name: propName,
            ...component.properties[propName],
            widgetTemplateId: insertedWidgetTemplate.id,
            dataTypeId: foundDataType.id
          })
        })
      ])
    })
  )
}
