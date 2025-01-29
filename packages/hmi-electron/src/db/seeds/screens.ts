import { type DBType } from '@/main/db'
import screens from './data/screens.json'
import * as schema from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export default async function seed(db: DBType) {
  await Promise.all(
    screens.map(async (screen) => {
      const [insertedScreen] = await db
        .insert(schema.screen)
        .values({ name: screen.name })
        .returning()
      await Promise.all(
        screen.widgets.map(async (widget) => {
          const foundTemplate = await db.query.widgetTemplate.findFirst({
            where: eq(schema.widgetTemplate.name, widget.templateName)
          })
          if (!foundTemplate)
            throw new Error(`No template found with this name: ${widget.templateName}`)
          const [insertedWidget] = await db
            .insert(schema.widget)
            .values({ ...widget, screenId: insertedScreen.id, widgetTemplateId: foundTemplate.id })
            .returning()
          await Promise.all(
            widget.props.map(async (prop) => {
              const propTemplate = await db.query.propertyTemplate.findFirst({
                where: and(
                  eq(schema.propertyTemplate.widgetTemplateId, foundTemplate.id),
                  eq(schema.propertyTemplate.name, prop.propName)
                )
              })
              if (!propTemplate)
                throw new Error(`No propertyTemplate found with this name: ${prop.propName}`)
              await db.insert(schema.property).values({
                widgetId: insertedWidget.id,
                propertyTemplateId: propTemplate.id
                // TODO:
                // data: prop.data
              })
            })
          )
        })
      )
    })
  )
}
