import { DBType } from '@/db'

export const getWidgetPropertyQuery = async (
  db: DBType,
  { widgetId, propertyTemplateId }: { widgetId: string; propertyTemplateId: string }
) => {
  return await db.query.property.findFirst({
    where: (property, { eq, and }) =>
      and(eq(property.widgetId, widgetId), eq(property.propertyTemplateId, propertyTemplateId))
  })
}
