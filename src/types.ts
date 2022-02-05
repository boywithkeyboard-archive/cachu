export interface Hooks {
  /**
   * A function getting fired before adding a new entry to the cache.
   */
  preWriting?: ({ entry }: {
    entry: RawEntry
  }) => Promise<RawEntry | null>

  /**
   * A function getting fired before getting an entry from the cache.
   */
  preReading?: ({ keyOfTargetedEntry }: {
    keyOfTargetedEntry: any
  }) => Promise<boolean>

  /**
   * A function getting fired before getting an entry from the cache.
   */
  preGrabbing?: ({ keyOfTargetedEntry }: {
    keyOfTargetedEntry: any
  }) => Promise<boolean>

  /**
   * A function getting fired before updating an entry in the cache.
   */
  preUpdating?: ({ keyOfTargetedEntry }: {
    keyOfTargetedEntry: any
  }) => Promise<boolean>

  /**
   * A function getting fired before stealing an entry from the cache.
   */
  preStealing?: ({ keyOfTargetedEntry }: {
    keyOfTargetedEntry: any
  }) => Promise<boolean>

  /**
   * A function getting fired before purging an entry from the cache.
   */
  prePurging?: ({ keyOfTargetedEntry }: {
    keyOfTargetedEntry: any
  }) => Promise<boolean>

  /**
   * A function getting fired before pruning the cache.
   */
  prePruning?: ({ entries }: {
    entries: RawEntry[]
  }) => Promise<boolean>
}

export interface RawEntry {
  key: any,
  value: any,
  createdAt: number
}

export interface Entry {
  key: any,
  value: any
}