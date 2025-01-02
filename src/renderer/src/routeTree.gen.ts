/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TagsImport } from './routes/tags'
import { Route as EditImport } from './routes/edit'
import { Route as ConfigImport } from './routes/config'
import { Route as IndexImport } from './routes/index'
import { Route as EditIndexImport } from './routes/edit.index'
import { Route as EditScreenIdImport } from './routes/edit.$screenId'

// Create/Update Routes

const TagsRoute = TagsImport.update({
  id: '/tags',
  path: '/tags',
  getParentRoute: () => rootRoute,
} as any)

const EditRoute = EditImport.update({
  id: '/edit',
  path: '/edit',
  getParentRoute: () => rootRoute,
} as any)

const ConfigRoute = ConfigImport.update({
  id: '/config',
  path: '/config',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const EditIndexRoute = EditIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => EditRoute,
} as any)

const EditScreenIdRoute = EditScreenIdImport.update({
  id: '/$screenId',
  path: '/$screenId',
  getParentRoute: () => EditRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/config': {
      id: '/config'
      path: '/config'
      fullPath: '/config'
      preLoaderRoute: typeof ConfigImport
      parentRoute: typeof rootRoute
    }
    '/edit': {
      id: '/edit'
      path: '/edit'
      fullPath: '/edit'
      preLoaderRoute: typeof EditImport
      parentRoute: typeof rootRoute
    }
    '/tags': {
      id: '/tags'
      path: '/tags'
      fullPath: '/tags'
      preLoaderRoute: typeof TagsImport
      parentRoute: typeof rootRoute
    }
    '/edit/$screenId': {
      id: '/edit/$screenId'
      path: '/$screenId'
      fullPath: '/edit/$screenId'
      preLoaderRoute: typeof EditScreenIdImport
      parentRoute: typeof EditImport
    }
    '/edit/': {
      id: '/edit/'
      path: '/'
      fullPath: '/edit/'
      preLoaderRoute: typeof EditIndexImport
      parentRoute: typeof EditImport
    }
  }
}

// Create and export the route tree

interface EditRouteChildren {
  EditScreenIdRoute: typeof EditScreenIdRoute
  EditIndexRoute: typeof EditIndexRoute
}

const EditRouteChildren: EditRouteChildren = {
  EditScreenIdRoute: EditScreenIdRoute,
  EditIndexRoute: EditIndexRoute,
}

const EditRouteWithChildren = EditRoute._addFileChildren(EditRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/config': typeof ConfigRoute
  '/edit': typeof EditRouteWithChildren
  '/tags': typeof TagsRoute
  '/edit/$screenId': typeof EditScreenIdRoute
  '/edit/': typeof EditIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/config': typeof ConfigRoute
  '/tags': typeof TagsRoute
  '/edit/$screenId': typeof EditScreenIdRoute
  '/edit': typeof EditIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/config': typeof ConfigRoute
  '/edit': typeof EditRouteWithChildren
  '/tags': typeof TagsRoute
  '/edit/$screenId': typeof EditScreenIdRoute
  '/edit/': typeof EditIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/config' | '/edit' | '/tags' | '/edit/$screenId' | '/edit/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/config' | '/tags' | '/edit/$screenId' | '/edit'
  id:
    | '__root__'
    | '/'
    | '/config'
    | '/edit'
    | '/tags'
    | '/edit/$screenId'
    | '/edit/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ConfigRoute: typeof ConfigRoute
  EditRoute: typeof EditRouteWithChildren
  TagsRoute: typeof TagsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ConfigRoute: ConfigRoute,
  EditRoute: EditRouteWithChildren,
  TagsRoute: TagsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/config",
        "/edit",
        "/tags"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/config": {
      "filePath": "config.tsx"
    },
    "/edit": {
      "filePath": "edit.tsx",
      "children": [
        "/edit/$screenId",
        "/edit/"
      ]
    },
    "/tags": {
      "filePath": "tags.tsx"
    },
    "/edit/$screenId": {
      "filePath": "edit.$screenId.tsx",
      "parent": "/edit"
    },
    "/edit/": {
      "filePath": "edit.index.tsx",
      "parent": "/edit"
    }
  }
}
ROUTE_MANIFEST_END */
