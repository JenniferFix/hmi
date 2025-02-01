import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query'
import { database } from '@renderer/db'
import { propertyTemplate, type InsertPropertyTemplateType } from '@db/schema'
import { BaseSQLiteDatabase, SQLiteDeleteBase } from 'drizzle-orm/sqlite-core'
import * as schema from '@db/schema'

export function useGetPropertyType(db: BaseSQLiteDatabase<typeof schema>) {
  //
}
