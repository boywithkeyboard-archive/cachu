import os from 'os'

export default class MemoryCache {
  private maxAge: number
  private maxAmount: number
  private maxMemory: number
  private overrideEntries: boolean
  private hooks: Hooks
  private store: Map<Key, { value: Value, createdAt: number }>

  /**
   * Create a new `MemoryCache`.
   */
  constructor(config?: Configuration) {
    if (!config) config = {}

    // maximum age in seconds
    this.maxAge = config.maxAge ?? Infinity

    // maximum entries
    this.maxAmount = config.maxAmount ?? Infinity

    // if entry exists already, override existing one on writing
    this.overrideEntries = (config.overrideEntries === true)

    // maximum memory in megabytes
    this.maxMemory = config.maxMemory ? config.maxMemory * 1024 * 1024 :  os.freemem() * 0.8

    // hooks
    this.hooks = config.hooks ?? {}

    // store (holding all entries)
    this.store = new Map()
  }

  private purgeOutdatedEntries = async () => {
    this.store.forEach(async (value, key) => {
      if (Date.now() - value.createdAt > this.maxAge.valueOf() * 1000) this.store.delete(key)
    })
  }

  private purgeOldestEntry = async () => {
    let oldestAge = 0
    let keyOfOldestEntry: Key = 0

    this.store.forEach(async (value, key) => {
      if (value.createdAt > oldestAge) {
        oldestAge = value.createdAt
        keyOfOldestEntry = key
      }
    })

    this.store.delete(keyOfOldestEntry)
  }

  /**
   * Create a new entry in the cache.
   */
  write = async (key: Key, value: Value) => {
    // create new entry
    let newEntry: any = {
      key: key,
      value: value,
      createdAt: Date.now()
    }

    // trigger hook
    if (this.hooks?.preWriting) {
      newEntry = await this.hooks.preWriting({ entry: newEntry })
      if (!newEntry) return false
    }

    // check uniqueness of key
    if (this.store.has(key) && !this.overrideEntries) return false
  
    // remove outdated entries
    await this.purgeOutdatedEntries()
  
    // remove oldest entry if store has too much entries or the cache exceeds its maximum memory
    if (this.store.size === this.maxAmount || os.freemem() < this.maxMemory) await this.purgeOldestEntry()
  
    // add new entry to store
    this.store.set(key, { value: newEntry.value, createdAt: newEntry.createdAt })

    // let the user know everything went alright
    return true
  }

  /**
   * Create a new entry in the cache.
   */
  writeMany = async (entries: KeyValue[]) => {
    for (const entry of entries) {
      // create new entry
      let newEntry: any = {
        key: entry.key,
        value: entry.value,
        createdAt: Date.now()
      }

      // trigger hook
      if (this.hooks?.preWriting) {
        newEntry = await this.hooks.preWriting({ entry: newEntry })
        if (!newEntry) return false
      }

      // check uniqueness of key
      if (this.store.has(entry.key) && !this.overrideEntries) return false
  
      // remove outdated entries
      await this.purgeOutdatedEntries()
  
      // remove oldest entry if store has too much entries or the cache exceeds its maximum memory
      if (this.store.size === this.maxAmount || os.freemem() < this.maxMemory) await this.purgeOldestEntry()
  
      // add new entry to store
      this.store.set(entry.key, { value: newEntry.value, createdAt: newEntry.createdAt })
    }

    // let the user know everything went alright
    return true
  }

  /**
   * Calculates the amount of memory consumed by the cache.
   */
  getConsumedMemory = async () => {}
}