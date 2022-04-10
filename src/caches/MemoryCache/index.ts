import ms from 'ms'

/**
 * Create a new `MemoryCache`
 */
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

type Key = {}
type Value = {}

type Record = {
  key: Key,
  value: Value,
  age: number,
  maxAge?: number
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

const memoryCache: MemoryCache = (config = {}) => {
  const store: Map<any, { value: {}, age: number, maxAge?: number }> = new Map()
  const hooks: { [key: string]: any } = {}
  let recentRecord: Record | undefined

  let maxAge = typeof config.maxAge === 'number' ? config.maxAge * 1000 : typeof config.maxAge === 'string' ? ms(config.maxAge) : 600000 // 10 minutes
  let maxAmount = config.maxAmount ?? 10000

  const prune = async () => {
    store.forEach(async (value, key) => {
      if (Date.now() - value.age > maxAge) store.delete(key)
    })
  }

  const deleteOldestEntry = async () => {
    let oldestAge = 0
    let keyOfOldestEntry: any = 0

    store.forEach(async (value, key) => {
      if (value.age > oldestAge) {
        oldestAge = value.age
        keyOfOldestEntry = key
      }
    })

    store.delete(keyOfOldestEntry)
  }

  const on: OnMethod = async (event, action) => {
    hooks[event] = action
  }

  const modifyMaxAge: MaxAgeMethod = async newAge => {
    if (hooks.maxAge) await hooks.maxAge(newAge)

    if (newAge) {
      maxAge = typeof newAge === 'number' ? newAge * 1000 : typeof newAge === 'string' ? ms(newAge) : 600000

      await prune()
    }

    return maxAge
  }

  const modifyMaxAmount: MaxAmountMethod = async newAmount => {
    if (hooks.maxAmount) await hooks.maxAmount(newAmount)

    if (newAmount) {
      maxAmount = newAmount ?? 10000

      await prune()
    }

    return maxAmount
  }

  const set: SetMethod = async (key, value, customMaxAge) => {
    if (hooks.set) await hooks.set(key, value, customMaxAge)

    if (store.has(key)) return undefined
    if (maxAge !== Infinity) await prune()
    if (store.size > maxAmount) await deleteOldestEntry()

    const data = {
      value,
      age: Date.now(),
      ...(typeof customMaxAge === 'string' ? { maxAge: ms(customMaxAge) } : typeof customMaxAge === 'number' && { maxAge: customMaxAge * 1000 })
    }

    store.set(key, data)

    recentRecord = {
      key,
      ...data
    }

    return {
      key,
      ...data
    }
  }

  const setMany: SetManyMethod = async records => {
    if (hooks.setMany) await hooks.setMany(records)

    if (maxAge !== Infinity) await prune()

    const addedRecords: any[] = []

    for (const record of records) {
      const key = record[0]
      const value = record[1]
      const customMaxAge = record[2]

      if (store.has(key)) {
        addedRecords.push(undefined)
        continue
      }
  
      const data = {
        value,
        age: Date.now(),
        ...(typeof customMaxAge === 'string' ? { maxAge: ms(customMaxAge) } : typeof customMaxAge === 'number' && { maxAge: customMaxAge * 1000 })
      }

      if (store.size > maxAmount) await deleteOldestEntry()
  
      store.set(key, data)

      recentRecord = {
        key,
        ...data
      }
  
      addedRecords.push({
        key,
        ...data
      })
    }

    return addedRecords
  }

  const get: GetMethod = async (key, config = {}) => {
    if (hooks.get) await hooks.get(key, config)

    const record = store.get(key)

    if (!record) return undefined
    if (config.validate !== false && (record.maxAge ? (Date.now() - record.age > record.maxAge) : (Date.now() - record.age > maxAge))) {
      store.delete(key)
      return undefined
    }
    if (config.delete) store.delete(key)

    return {
      key,
      ...record
    }
  }

  const getMany: GetManyMethod = async (keys, config = {}) => {
    if (hooks.getMany) await hooks.getMany(keys, config)

    const records: any[] = []

    for (const key of keys) {
      const record = store.get(key)

      if (!record) {
        records.push(undefined)
        continue
      }

      if (config.validate !== false && (record.maxAge ? (Date.now() - record.age > record.maxAge) : (Date.now() - record.age > maxAge))) {
        store.delete(key)
        records.push(undefined)
        continue
      }

      if (config.delete) store.delete(key)

      records.push({
        key,
        ...record
      })
    }

    if (config.reverse) return records.reverse()
    return records
  }

  const update: UpdateMethod = async (key, value, config) => {
    if (hooks.update) await hooks.update(key, value, config ?? {})

    const oldRecord = store.get(key)
    if (!oldRecord) return

    const data = {
      value,
      age: (config && config.updateAge) ? Date.now() : oldRecord.age,
      ...(oldRecord.maxAge && { maxAge: oldRecord.maxAge })
    }

    store.set(key, data)

    recentRecord = {
      key,
      ...data
    }
  }

  const updateMany: UpdateManyMethod = async (records, config) => {
    if (hooks.updateMany) await hooks.updateMany(records, config ?? {})

    for (const record of records) {
      const oldRecord = store.get(record[0])
      if (!oldRecord) return

      const data = {
        value: record[1],
        age: (config && config.updateAge) ? Date.now() : oldRecord.age,
        ...(oldRecord.maxAge && { maxAge: oldRecord.maxAge })
      }
  
      store.set(record[0], data)

      recentRecord = {
        key: record[0],
        ...data
      }
    }
  }

  const _delete: DeleteMethod = async key => {
    if (hooks.delete) await hooks.delete(key)

    store.delete(key)
  }

  const deleteMany: DeleteManyMethod = async keys => {
    if (hooks.deleteMany) await hooks.deleteMany(keys)

    // delete all
    if (keys.length === 0) store.clear()

    // delete many
    for (const key of keys) store.delete(key)
  }

  const has: HasMethod = async key => {
    if (hooks.has) await hooks.has(key)

    return store.has(key)
  }

  const size: SizeMethod = async () => {
    if (hooks.size) await hooks.size()

    return store.size
  }

  const clear: ClearMethod = async () => {
    if (hooks.clear) await hooks.clear()

    return await prune()
  }

  const keys: KeysMethod = async () => {
    if (hooks.keys) await hooks.keys()

    return [...store.keys()]
  }

  const values: ValuesMethod = async () => {
    if (hooks.values) await hooks.values()

    const values = []

    // get values without age and maxAge properties
    for (const value of [...store.values()]) values.push(value.value)

    return values
  }

  const memory: MemoryMethod = async () => {
    if (hooks.memory) await hooks.memory()

    const data = [...store.keys()].toString() + [...store.values()].toString()
    const buffer = Buffer.from(data)
    return Buffer.byteLength(buffer)
  }

  const recent: RecentMethod = async () => {
    if (hooks.recent) await hooks.recent()

    return recentRecord
  }

  return {
    set,
    setMany,
    get,
    getMany,
    update,
    updateMany,
    delete: _delete,
    deleteMany,
    has,
    size,
    keys,
    values,
    clear,
    memory,
    recent,
    maxAge: modifyMaxAge,
    maxAmount: modifyMaxAmount,
    on
  }
}

export default memoryCache