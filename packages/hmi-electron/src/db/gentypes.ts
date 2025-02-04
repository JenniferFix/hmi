import { z } from 'zod'

export function createZodSchema(fields: {
  [key: string]: {
    type: string
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
  }
}) {
  const schemaFields: { [key: string]: z.ZodTypeAny } = {}

  for (const [fieldName, config] of Object.entries(fields)) {
    switch (config.type) {
      case 'string':
        let fieldSchema: z.ZodString = z.string()
        if (config.minLength !== undefined) {
          fieldSchema = fieldSchema.min(config.minLength)
        }
        if (config.maxLength !== undefined) {
          fieldSchema = fieldSchema.max(config.maxLength)
        }
        schemaFields[fieldName] = fieldSchema
        break
      case 'number':
        let numberSchema: z.ZodNumber = z.coerce.number()
        if (config.min !== undefined) {
          numberSchema = numberSchema.min(config.min)
        }
        if (config.max !== undefined) {
          numberSchema = numberSchema.max(config.max)
        }
        schemaFields[fieldName] = numberSchema
        break
      case 'boolean':
        let boolSchema: z.ZodBoolean = z.boolean()
        schemaFields[fieldName] = boolSchema
        break
      case 'date':
        let dateSchema: z.ZodDate = z.date()
        schemaFields[fieldName] = dateSchema
        break
    }
    if (!config.required) {
      schemaFields[fieldName] = schemaFields[fieldName].optional()
    }
  }

  return z.object(schemaFields)
}
