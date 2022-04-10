export type Key = {}
export type Value = {}

export type Record = {
  key: Key,
  value: Value,
  age: number,
  maxAge?: number
}

export type Trigger = 'set' | 'setMany' | 'get' | 'getMany' | 'update' | 'updateMany' | 'delete' | 'deleteMany' | 'has' | 'size' | 'keys' | 'values' | ''

export type Action = Function

export type Hooks = {
  writing?: Function,
  onReading?: Function,
  onUpdating?: Function,
  onDeleting?: Function,
  onClearing?: Function,
  onPruning?: Function
}