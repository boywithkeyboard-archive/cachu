export interface Hooks {
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
   * A function getting fired before getting an entry from the cache.
   */
  preGrabbing?: ({ keyOfTargetedEntry }: {
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

export type Key = any
export type Value = any

export interface Entry {
  key: Key,
  value: Value,
  createdAt: number
}

export interface KeyValue {
  key: Key,
  value: Value
}