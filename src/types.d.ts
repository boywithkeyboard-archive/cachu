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
   * Set the maximum memory the cache can consume.
   */
  maxMemory?: number,
  /**
   * Allow overriding of entries on writing.
   */
  overrideEntries?: boolean
}

interface Hooks {
  /**
   * A function getting fired before adding a new entry to the cache.
   */
  preWriting?: ({ entry }: {
    entry: Entry
  }) => Promise<Entry | null>
  /**
   * A function getting fired before getting an entry from the cache.
   */
  preReading?: ({ keyOfTargetedEntry }: {
    keyOfTargetedEntry: Key
  }) => Promise<boolean>
  /**
   * A function getting fired before updating an entry in the cache.
   */
  preUpdating?: ({ keyOfTargetedEntry }: {
    keyOfTargetedEntry: Key
  }) => Promise<boolean>
  /**
   * A function getting fired before stealing an entry from the cache.
   */
  preStealing?: ({ keyOfTargetedEntry }: {
    keyOfTargetedEntry: Key
  }) => Promise<boolean>
  /**
   * A function getting fired before purging an entry from the cache.
   */
  prePurging?: ({ keyOfTargetedEntry }: {
    keyOfTargetedEntry: Key
  }) => Promise<boolean>
  /**
   * A function getting fired before pruning the cache.
   */
  prePruning?: ({ entries }: {
    entries: Entry[]
  }) => Promise<boolean>
}

type Key = string | number | bigint | boolean | object | any[] | Buffer
type Value = string | number | bigint | boolean | object | any[] | Buffer

interface Entry {
  key: Key,
  value: Value,
  createdAt: number
}

interface KeyValue {
  key: Key,
  value: Value
}

type Action = (entry: Entry) => Promise<Entry>