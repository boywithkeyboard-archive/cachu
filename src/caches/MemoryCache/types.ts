type Key = {}

type Value = {}

type Record = {
  key: Key,
  value: Value,
  age: number,
  maxAge?: number
}

type MemoryCache = (config: {
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
  on: OnMethod
}

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

type OnMethod = (event: Event, action: Function) => Promise<void>

type MaxAgeMethod = (newAge?: string | number) => Promise<number>

type MaxAmountMethod = (newAmount?: number) => Promise<number>

type SetMethod = (key: Key, value: Value, maxAge?: number | string) => Promise<Record | undefined>

type SetManyMethod = (records: [Key, Value, number | string | undefined][]) => Promise<(Record | undefined)[]>

type OldestMethod = () => Promise<Record | undefined>

type NewestMethod = () => Promise<Record | undefined>

type GetMethod = (key: Key, config?: {
  validate?: boolean,
  delete?: boolean
}) => Promise<Record | undefined>

type GetManyMethod = (keys: Key[], config?: {
  reverse?: boolean, // default: false
  validate?: boolean, // default: true
  delete?: boolean // default: false
}) => Promise<(Record | undefined)[]>

type ClearMethod = () => Promise<void>

type KeysMethod = () => Promise<any[]>

type ValuesMethod = () => Promise<any[]>

type MemoryMethod = () => Promise<number>

type RecentMethod = () => Promise<Record | undefined>

type SizeMethod = () => Promise<number>

type HasMethod = (key: Key) => Promise<boolean>

type DeleteMethod = (key: Key) => Promise<void>

type DeleteManyMethod = (keys: Key[]) => Promise<void>

type UpdateMethod = (key: Key, value: Value, config?: {
  updateAge: boolean
}) => Promise<void>

type UpdateManyMethod = (records: [Key, Value][], config: {
  updateAge: boolean
}) => Promise<void>

export {
  Record,
  MemoryCache,
  OnMethod,
  DeleteMethod,
  NewestMethod,
  OldestMethod,
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