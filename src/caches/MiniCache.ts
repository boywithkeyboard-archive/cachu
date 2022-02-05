interface Configuration {
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

export default class MiniCache {
  private maxAge: number
  private maxAmount: number
  private overriding: boolean
  private store: Map<any, { value: any, createdAt: number }>

  /**
   * Create a new `MiniCache`.
   * 
   * [📒 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/caches/MiniCache.md)
   */
  constructor(config?: Configuration) {
    if (!config) config = {}

    // maximum age in seconds
    this.maxAge = config.maxAge ?? Infinity

    // maximum entries
    this.maxAmount = config.maxAmount ?? Infinity

    // if entry exists already, override existing one on writing
    this.overriding = (config.overriding === true)

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
    let keyOfOldestEntry: any

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
   * [📒 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/write.md)
   */
  write = async (key: any, value: any) => {
    // create new entry
    let newEntry: any = {
      key: key,
      value: value,
      createdAt: Date.now()
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
   * Read an entry from the cache.
   * 
   * [📒 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/get.md)
   */
  get = async (key: any) => {
    await this.purgeOutdatedEntries()

    const entry = this.store.get(key)

    if (entry) return entry.value
    return null
  }

  /**
   * Grab an entry from the cache.
   * 
   * [📒 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/grab.md)
   */
  grab = async (key: any) => {
    const entry = this.store.get(key)
  
    if (entry) return entry.value
    return null
  }

  /**
   * Steal an entry from the cache.
   * 
   * [📒 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/steal.md)
   */
  steal = async (key: any) => {
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
   * Modify an entry in the cache.
   * 
   * [📒 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/update.md)
   */
  update = async (key: any, value: any) => { 
    if (!this.store.has(key)) return

    this.store.set(key, {
      value: value,
      createdAt: Date.now()
    })
  }

  /**
   * Purge an entry from the cache.
   * 
   * [📒 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/purge.md)
   */
  purge = async (key: any) => {
    this.store.delete(key)
  }

  /**
   * Check whether the cache has a specific entry.
   * 
   * [📒 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/has.md)
   */
  has = async (key: any) => {
    return this.store.has(key)
  }

  /**
   * Purge all stale entries manually.
   * 
   * [📒 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/prune.md)
   */
  prune = async () => {
    await this.purgeOutdatedEntries()
  }

  /**
   * Calculates the amount of memory in bytes consumed by the cache.
   * 
   * [📒 Read the Guide](https://github.com/azurydev/cachu/blob/current/guide/features/getConsumedMemory.md)
   */
  getConsumedMemory = async () => {
    const values = [...this.store.values()].toString()
    const buffer = Buffer.from(values)
    return Buffer.byteLength(buffer)
  }
}