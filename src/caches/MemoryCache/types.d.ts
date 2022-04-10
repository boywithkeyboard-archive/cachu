import { Key, Record, Value } from '../../types'

/**
 * Create a new `MemoryCache`
 */
type MemoryCache = (config: {
  maxAge?: string | number,
  maxAmount?: number
}) => Promise<{
  set: SetMethod,
  setMany: SetManyMethod,
  get: GetMethod,
  getMany: GetManyMethod,
  update: UpdateMethod,
  updateMany: UpdateManyMethod,
  delete: DeleteMethod,
  deleteMany: DeleteManyMethod,
  has: HasMethod,
  size: SizeMethod,
  keys: KeysMethod,
  values: ValuesMethod,
  clear: ClearMethod,
  memory: MemoryMethod,
  recent: RecentMethod,
  maxAge: MaxAgeMethod,
  maxAmount: MaxAmountMethod,
  on: OnMethod
}>

type Event =
  | 'set'
  | 'setMany' 
  | 'get'
  | 'getMany'
  | 'update'
  | 'updateMany'
  | 'delete'
  | 'deleteMany'
  | 'has'
  | 'size'
  | 'keys'
  | 'values'
  | 'clear'
  | 'memory'
  | 'recent'
  | 'maxAge'
  | 'maxAmount'
  | 'on'

/**
 * Add a event handler.
 */
type OnMethod = (event: Event, action: Function) => Promise<void>

/**
 * Change or get the maximum age of records.
 */
type MaxAgeMethod = (newAge?: string | number) => Promise<number>

/**
 * Change or get the limit of records.
 */
type MaxAmountMethod = (newAmount?: number) => Promise<number>

/**
 * Add a new record to the cache.
 */
type SetMethod = (key: Key, value: Value, maxAge?: number | string) => Promise<Record | undefined>

/**
 * Add many new records to the cache.
 */
type SetManyMethod = (records: [Key, Value, number | string | undefined][]) => Promise<(Record | undefined)[]>

/**
 * Read a record from the cache.
 */
type GetMethod = (key: Key, config?: {
  validate?: boolean,
  delete?: boolean
}) => Promise<Record | undefined>

/**
 * Read many records from the cache.
 */
type GetManyMethod = (keys: Key[], config?: {
  reverse?: boolean, // default: false
  validate?: boolean, // default: true
  delete?: boolean // default: false
}) => Promise<(Record | undefined)[]>

/**
 * Delete all stale records manually.
 */
type ClearMethod = () => Promise<void>

/**
 * Get an array of all record keys.
 */
type KeysMethod = () => Promise<any[]>

/**
 * Get an array of all record values.
 */
type ValuesMethod = () => Promise<any[]>

/**
 * Get the amount of memory in bytes consumed by the cache.
 */
type MemoryMethod = () => Promise<number>

/**
 * Get the most recent updated or added record.
 */
type RecentMethod = () => Promise<Record | undefined>

/**
 * Get the amount of records in the cache.
 */
type SizeMethod = () => Promise<number>

/**
 * Check whether the cache has a specific record.
 */
type HasMethod = (key: Key) => Promise<boolean>

/**
 * Delete a record from the cache.
 */
type DeleteMethod = (key: Key) => Promise<void>

/**
 * Delete many records from the cache.
 */
type DeleteManyMethod = (keys: Key[]) => Promise<void>

/**
 * Update the value of a record.
 */
type UpdateMethod = (key: Key, value: Value, config?: {
  updateAge: boolean
}) => Promise<void>

/**
 * Update the values of many records.
 */
type UpdateManyMethod = (records: [Key, Value][], config: {
  updateAge: boolean
}) => Promise<void>

export {
  MemoryCache,
  OnMethod,
  DeleteMethod,
  UpdateMethod,
  UpdateManyMethod,
  DeleteManyMethod,
  HasMethod,
  MaxAgeMethod,
  SetManyMethod,
  MaxAmountMethod,
  SetMethod,
  RecentMethod,
  GetMethod,
  GetManyMethod,
  KeysMethod,
  ValuesMethod,
  MemoryMethod,
  SizeMethod,
  ClearMethod
}