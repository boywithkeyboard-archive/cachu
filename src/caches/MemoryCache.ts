import ms from 'ms'
import {
  MemoryCache,
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
  DumpMethod
} from '../../types/caches/MemoryCache'

const memoryCache: MemoryCache = (config = {}) => {
  const store: Map<any, { value: {}, age: number, maxAge?: number }> = new Map()
  const hooks: { [key: string]: any } = {}

  let recentRecord: Record | undefined

  , maxAge =
    typeof config.maxAge === 'number' ? config.maxAge * 1000 :
    typeof config.maxAge === 'string' ? ms(config.maxAge) :
    600000 // 10 minutes

  , maxAmount = config.maxAmount ?? 10000

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

  const newest: NewestMethod = async () => {
    if (hooks.newest) await hooks.newest()
    if (store.size === 0) return undefined

    let newestAge = 0
    let record

    store.forEach(async (value, key) => {
      if (value.age > newestAge) {
        newestAge = value.age
        record = {
          key,
          value: value.value,
          age: value.age,
          ...(value.maxAge && { maxAge: value.maxAge })
        }
      }
    })

    return record
  }

  const oldest: OldestMethod = async () => {
    if (hooks.oldest) await hooks.oldest()
    if (store.size === 0) return undefined

    let oldestAge = 0
    let record

    store.forEach(async (value, key) => {
      if ((oldestAge === 0) || (value.age < oldestAge)) {
        oldestAge = value.age
        record = {
          key,
          value: value.value,
          age: value.age,
          ...(value.maxAge && { maxAge: value.maxAge })
        }
      }
    })

    return record
  }

  const dump: DumpMethod = async () => {
    if (hooks.dump) await hooks.dump()

    if (store.size === 0) return []

    const records: Record[] = []
    const keys = [...store.keys()]

    for (const key of keys) {
      const record = store.get(key)
      if (!record) continue

      records.push({
        key,
        ...record
      })
    }

    return records
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
    newest,
    oldest,
    on,
    dump
  }
}

export default memoryCache