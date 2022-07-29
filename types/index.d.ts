export type InitializeCache = (config?: {
  maxAge?: number | string
  maxAmount?: number
  autodelete?: boolean
}) => {
  add: (key: any, value: any, maxAge?: number | string) => Promise<void>
  addMany: (...entries: ([any, any, number | string] | [any, any])[]) => Promise<void>
  get: (key: any) => Promise<any>
  getMany: (...keys: any[]) => Promise<any[]>
  update: (key: any, value: any) => Promise<void>
  updateMany: (...entries: [any, any][]) => Promise<void>
  remove: (key: any) => Promise<void>
  removeMany: (...keys: any[]) => Promise<void>
  has: (key: any) => Promise<boolean>
  size: () => Promise<number>
  keys: () => Promise<any[]>
  values: () => Promise<any[]>
  clear: () => Promise<void>
}

export const useCache: InitializeCache
