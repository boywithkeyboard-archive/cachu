import ms from 'ms'
import type { InitializeCache } from '../types'

export const useCache: InitializeCache = (config = {}) => {
  const maxAge = typeof config.maxAge === 'string' ? ms(config.maxAge) : !config.maxAge ? ms('10m') : config.maxAge * 1000
  , maxAmount = config.maxAmount ?? 10000
  , autodelete = config.autodelete ?? false

  , store = new Map<any, { v: any, e: number }>()

  , removeOldest = async (r: number): Promise<void> => {
    let oldestAge = Date.now()
    , oldestKey

    for (let e of store) {
      if (e[1].e > oldestAge) continue

      oldestAge = e[1].e
      oldestKey = e[0]
    }

    if (oldestKey)
      store.delete(oldestKey)

    r--

    if (r > 0)
      return await removeOldest(r)
  }

  , removeOveraged = async () => {
    for (let e of store)
      if (e[1].e <= Date.now())
        store.delete(e[0])
  }

  return {
    add: async (k, v, m) => {
      if (autodelete)
        await removeOveraged()

      if (store.size + 1 > maxAmount)
        await removeOldest(1)

      store.set(k, {
        v,
        e: Date.now() + (!m ? maxAge : typeof m === 'string' ? ms(m) : m * 1000)
      })
    },

    addMany: async (...e) => {
      if (autodelete)
        await removeOveraged()

      if (store.size + e.length > maxAmount)
        await removeOldest(store.size + e.length - maxAmount)

      for (let [k, v, m] of e)
        store.set(k, {
          v,
          e: Date.now() + (!m ? maxAge : typeof m === 'string' ? ms(m) : m)
        })
    },

    get: async k => {
      const entry = store.get(k)

      if (!entry) return

      if (entry.e > Date.now())
        return entry.v

      store.delete(k)
    },

    getMany: async (...k) => {
      const entries = []

      for (let i of k) {
        const entry = store.get(i)

        if (!entry) {
          entries.push(undefined)
        } else if (entry.e <= Date.now()) {
          store.delete(i)
          
          entries.push(undefined)
        } else {
          entries.push(entry.v)
        }
      }

      return entries
    },

    update: async (k, v) => {
      const entry = store.get(k)

      if (!entry) return

      store.set(k, {
        v,
        e: entry.e + maxAge * .75
      })
    },

    updateMany: async (...e) => {
      for (let [k, v] of e) {
        const entry = store.get(k)

        if (!entry) continue

        store.set(k, {
          v,
          e: entry.e + maxAge * .75
        })
      }
    },

    remove: async k => {
      store.delete(k)
    },

    removeMany: async (...k) => {
      if (k.length === 0)
        return store.clear()

      for (let i of k)
        store.delete(i)
    },

    has: async k => {
      const entry = store.get(k)

      if (!entry)
        return false

      if (entry.e > Date.now())
        return true

      store.delete(k)

      return false
    },

    size: async () => {
      const replacer = (k: any, v: any) => {
        if (v instanceof Map)
          return {
            dataType: 'Map',
            value: [...v]
          }

        return v
      }

      return JSON.stringify(store, replacer).length
    },

    keys: async () => [...store.keys()],

    values: async () => {
      let v = []

      for (let i of store.values())
        v.push(i.v)

      return v
    },

    clear: removeOveraged
  }
}
