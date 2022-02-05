import { Hooks, RawEntry, Entry } from '../types'

interface Configuration {
  /**
   * Customize **cachu**'s functionality to your desire.
   */
  hooks?: Hooks,

  /**
   * Set the maximum age for cache entries.
   */
  maxAge?: number,

  /**
   * Set the maximum amount of entries the cache can hold.
   */
  maxAmount?: number,

  /**
   * Allow overriding of entries on writing.
   */
  overriding?: boolean
}

export default class MemoryCache {
  private maxAge: number
  private maxAmount: number
  private overriding: boolean
  private hooks: Hooks
  private store: Map<any, { value: any, createdAt: number }>

  /**
   * Create a new `MemoryCache`.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/caches/MemoryCache.md)
   */
  constructor(config?: Configuration) {
    if (!config) config = {}

    // maximum age in seconds
    this.maxAge = config.maxAge ?? Infinity

    // maximum entries
    this.maxAmount = config.maxAmount ?? Infinity

    // if entry exists already, override existing one on writing
    this.overriding = (config.overriding === true)

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
    let keyOfOldestEntry: any = 0

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
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/write.md)
   */
  write = async (key: any, value: any) => {
    // create new entry
    let newEntry: any = {
      key: key,
      value: value,
      createdAt: Date.now()
    }

    // trigger hook
    if (this.hooks?.preWriting) {
      newEntry = await this.hooks.preWriting({ entry: newEntry })
      if (!newEntry) return
    }

    // check uniqueness of key
    if (this.store.has(key) && !this.overriding) return
  
    // remove outdated entries
    await this.purgeOutdatedEntries()
  
    // remove oldest entry if store has too much entries
    if (this.store.size === this.maxAmount) await this.purgeOldestEntry()
  
    // add new entry to store
    this.store.set(key, { value: newEntry.value, createdAt: newEntry.createdAt })
  }

  /**
   * Create many new entries in the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/writeMany.md)
   */
  writeMany = async (entries: Entry[]) => {
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
        if (!newEntry) continue
      }

      // check uniqueness of key
      if (this.store.has(entry.key) && !this.overriding) continue
  
      // remove outdated entries
      await this.purgeOutdatedEntries()
  
      // remove oldest entry if store has too much entries
      if (this.store.size === this.maxAmount) await this.purgeOldestEntry()
  
      // add new entry to store
      this.store.set(entry.key, { value: newEntry.value, createdAt: newEntry.createdAt })
    }
  }

  /**
   * Read an entry from the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/get.md)
   */
  get = async (key: any) => {
    if (this.hooks?.preReading && !(await this.hooks.preReading({ keyOfTargetedEntry: key }))) return null

    await this.purgeOutdatedEntries()

    const entry = this.store.get(key)

    if (entry) return entry.value
    return null
  }

  /**
   * Read many entries from the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/getMany.md)
   */
  getMany = async (keys: any[]) => {
    await this.purgeOutdatedEntries()

    const data = []

    for (const key of keys) {
      if (this.hooks?.preReading && !(await this.hooks.preReading({ keyOfTargetedEntry: key }))) {
        data.push(null)
      } else {
        let entry = this.store.get(key)

        if (entry) data.push(entry.value)
        else data.push(null)
      }
    }

    return data
  }

  /**
   * Grab an entry from the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/grab.md)
   */
  grab = async (key: any) => {
    if (this.hooks?.preGrabbing && !(await this.hooks.preGrabbing({ keyOfTargetedEntry: key }))) return null

    const entry = this.store.get(key)
  
    if (entry) return entry.value
    return null
  }

  /**
   * Grab many entries from the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/grabMany.md)
   */
  grabMany = async (keys: any[]) => {
    const data = []
  
    for (const key of keys) {
      if (this.hooks?.preGrabbing && !(await this.hooks.preGrabbing({ keyOfTargetedEntry: key }))) {
        data.push(null)
      } else {
        let entry = this.store.get(key)
  
        if (entry) data.push(entry.value)
        else data.push(null)
      }
    }
  
    return data
  }

  /**
   * Steal an entry from the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/steal.md)
   */
  steal = async (key: any) => {
    if (this.hooks?.preStealing && !(await this.hooks.preStealing({ keyOfTargetedEntry: key }))) return null

    await this.purgeOutdatedEntries()

    // get entry from cache
    const entry = this.store.get(key)

    // make sure entry exists
    if (!entry) return null

    // remove entry from cache
    this.store.delete(key)
  
    return entry.value
  }

  /**
   * Steal many entries from the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/stealMany.md)
   */
  stealMany = async (keys: any[]) => {
    await this.purgeOutdatedEntries()

    const data = []

    for (const key of keys) {
      if (this.hooks?.preStealing && !(await this.hooks.preStealing({ keyOfTargetedEntry: key }))) {
        data.push(null)
      } else {
        // get entry from cache
        const entry = this.store.get(key)

        if (entry) {
          data.push(entry.value)

          // remove entry from cache
          this.store.delete(key)
        } else {
          data.push(null)
        }
      }
    }

    return data
  }

  /**
   * Modify an entry in the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/update.md)
   */
  update = async (key: any, value: any) => { 
    if (!this.store.has(key)) return

    if (this.hooks?.preUpdating && !(await this.hooks.preUpdating({ keyOfTargetedEntry: key }))) return

    this.store.set(key, {
      value: value,
      createdAt: Date.now()
    })
  }

  /**
   * Modify many entries in the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/updateMany.md)
   */
  updateMany = async (entries: Entry[]) => {
    for (const entry of entries) {
      if (!this.store.has(entry.key)) continue

      if (this.hooks?.preUpdating && !(await this.hooks.preUpdating({ keyOfTargetedEntry: entry.key }))) continue
  
      this.store.set(entry.key, {
        value: entry.value,
        createdAt: Date.now()
      })
    }
  }

  /**
   * Purge an entry from the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/purge.md)
   */
  purge = async (key: any) => {
    if (this.hooks?.prePurging && !(await this.hooks.prePurging({ keyOfTargetedEntry: key }))) return
    
    this.store.delete(key)
  }

  /**
   * Purge many or all entries from the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/purgeMany.md)
   */
  purgeMany = async (keys: any[]) => {
    if (keys.length === 0) {
      // purge all entries from the cache
      this.store.clear()
    } else {
      // purge many entries from the cache
      for (const key of keys) {
        if (this.hooks?.prePurging && !(await this.hooks.prePurging({ keyOfTargetedEntry: key }))) continue
        this.store.delete(key)
      }
    }
  }

  /**
   * Check whether the cache has a specific entry.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/has.md)
   */
  has = async (key: any) => {
    return this.store.has(key)
  }

  /**
   * Get the number of entries the cache holds.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/getAmountOfEntries.md)
   */
  getAmountOfEntries = async () => {
    return this.store.size
  }

  /**
   * Get an array of all entry keys.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/getanysOfEntries.md)
   */
  getKeysOfEntries = async () => {
    return [...this.store.keys()].reverse()
  }

  /**
   * Get an array of all entry values.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/getanysOfEntries.md)
   */
  getValuesOfEntries = async () => {
    // get values from cache
    const values = [...this.store.values()]
    const structuredanys = []

    // return only the values, not the createdAt property
    for(const value of values) structuredanys.push(value.value)

    return structuredanys.reverse()
  }

  /**
   * Purge all stale entries manually.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/prune.md)
   */
  prune = async () => {
    if (this.hooks?.prePruning) {
      const entries = [...this.store.entries()]
      const structuredEntries: RawEntry[] = []
      
      for (const entry of entries) {
        structuredEntries.push({
          key: entry[0],
          value: entry[1].value,
          createdAt: entry[1].createdAt
        })
      }

      await this.hooks.prePruning({ entries: structuredEntries })
    }

    await this.purgeOutdatedEntries()
  }

  /**
   * Calculates the amount of memory in bytes consumed by the cache.
   * 
   * [📖 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/getConsumedMemory.md)
   */
  getConsumedMemory = async () => {
    const values = [...this.store.values()].toString()
    const buffer = Buffer.from(values)
    return Buffer.byteLength(buffer)
  }
}