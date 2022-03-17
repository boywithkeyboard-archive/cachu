type Key = {}

type Value = {}

type Record = {
  key: Key,
  value: Value,
  age: number
}

type Trigger = 'preWriting' | 'preReading' | 'preUpdating' | 'preDeleting' | 'preClearing' | 'prePruning'

type Action = Function

type Hooks = {
  preWriting?: Function,
  preReading?: Function,
  preUpdating?: Function,
  preDeleting?: Function,
  preClearing?: Function,
  prePruning?: Function
}