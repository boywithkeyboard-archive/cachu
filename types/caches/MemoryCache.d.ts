declare type Key = any

declare type Value = any

declare type Record = {
  key: Key,
  value: Value,
  age: number,
  maxAge?: number
}

declare type SetMethod = (key: Key, value: Value, maxAge?: number | string) => Promise<Record | undefined>

declare type SetManyMethod = (records: [Key, Value, number | string | undefined][]) => Promise<(Record | undefined)[]>

declare type GetMethod = (key: Key, config?: {
  validate?: boolean,
  delete?: boolean
}) => Promise<Record | undefined>

declare type GetManyMethod = (keys: Key[], config?: {
  reverse?: boolean, // default: false
  validate?: boolean, // default: true
  delete?: boolean // default: false
}) => Promise<(Record | undefined)[]>

declare type UpdateMethod = (key: Key, value: Value, config?: {
  updateAge: boolean
}) => Promise<void>

declare type UpdateManyMethod = (records: [Key, Value][], config: {
  updateAge: boolean
}) => Promise<void>

declare type DeleteMethod = (key: Key) => Promise<void>

declare type DeleteManyMethod = (keys: Key[]) => Promise<void>

declare type HasMethod = (key: Key) => Promise<boolean>

declare type SizeMethod = () => Promise<number>

declare type KeysMethod = () => Promise<Key[]>

declare type ValuesMethod = () => Promise<Value[]>

declare type ClearMethod = () => Promise<void>

declare type MemoryMethod = () => Promise<number>

declare type RecentMethod = () => Promise<Record | undefined>

declare type MaxAgeMethod = (newAge?: string | number) => Promise<number>

declare type MaxAmountMethod = (newAmount?: number) => Promise<number>

declare type NewestMethod = () => Promise<Record | undefined>

declare type OldestMethod = () => Promise<Record | undefined>

declare type Event =
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
  | 'newest'
  | 'oldest'
  | 'on'
  | 'dump'

declare type OnMethod = (event: Event, action: Function) => Promise<void>

declare type DumpMethod = () => Promise<Record[]>

declare type MemoryCache = (config?: {
  maxAge?: string | number,
  maxAmount?: number
}) => {
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
  newest: NewestMethod,
  oldest: OldestMethod,
  on: OnMethod,
  dump: DumpMethod
}

declare const memoryCache: MemoryCache

export {
  Key,
  Value,
  Record,
  SetMethod,
  SetManyMethod,
  GetMethod,
  GetManyMethod,
  UpdateMethod,
  UpdateManyMethod,
  DeleteMethod,
  DeleteManyMethod,
  HasMethod,
  SizeMethod,
  KeysMethod,
  ValuesMethod,
  ClearMethod,
  MemoryMethod,
  RecentMethod,
  MaxAgeMethod,
  MaxAmountMethod,
  NewestMethod,
  OldestMethod,
  OnMethod,
  DumpMethod,
  MemoryCache,
  memoryCache as default
}