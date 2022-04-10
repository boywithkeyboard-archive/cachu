/**
 * Create a new `MemoryCache`
 */
declare type MemoryCache = (config: {
    maxAge?: string | number;
    maxAmount?: number;
}) => {
    set: SetMethod;
    setMany: SetManyMethod;
    get: GetMethod;
    getMany: GetManyMethod;
    update: UpdateMethod;
    updateMany: UpdateManyMethod;
    delete: DeleteMethod;
    deleteMany: DeleteManyMethod;
    has: HasMethod;
    size: SizeMethod;
    keys: KeysMethod;
    values: ValuesMethod;
    clear: ClearMethod;
    memory: MemoryMethod;
    recent: RecentMethod;
    maxAge: MaxAgeMethod;
    maxAmount: MaxAmountMethod;
    on: OnMethod;
};
declare type Key = {};
declare type Value = {};
declare type Record = {
    key: Key;
    value: Value;
    age: number;
    maxAge?: number;
};
declare type Event = 'set' | 'setMany' | 'get' | 'getMany' | 'update' | 'updateMany' | 'delete' | 'deleteMany' | 'has' | 'size' | 'keys' | 'values' | 'clear' | 'memory' | 'recent' | 'maxAge' | 'maxAmount' | 'on';
/**
 * Add a event handler.
 */
declare type OnMethod = (event: Event, action: Function) => Promise<void>;
/**
 * Change or get the maximum age of records.
 */
declare type MaxAgeMethod = (newAge?: string | number) => Promise<number>;
/**
 * Change or get the limit of records.
 */
declare type MaxAmountMethod = (newAmount?: number) => Promise<number>;
/**
 * Add a new record to the cache.
 */
declare type SetMethod = (key: Key, value: Value, maxAge?: number | string) => Promise<Record | undefined>;
/**
 * Add many new records to the cache.
 */
declare type SetManyMethod = (records: [Key, Value, number | string | undefined][]) => Promise<(Record | undefined)[]>;
/**
 * Read a record from the cache.
 */
declare type GetMethod = (key: Key, config?: {
    validate?: boolean;
    delete?: boolean;
}) => Promise<Record | undefined>;
/**
 * Read many records from the cache.
 */
declare type GetManyMethod = (keys: Key[], config?: {
    reverse?: boolean;
    validate?: boolean;
    delete?: boolean;
}) => Promise<(Record | undefined)[]>;
/**
 * Delete all stale records manually.
 */
declare type ClearMethod = () => Promise<void>;
/**
 * Get an array of all record keys.
 */
declare type KeysMethod = () => Promise<any[]>;
/**
 * Get an array of all record values.
 */
declare type ValuesMethod = () => Promise<any[]>;
/**
 * Get the amount of memory in bytes consumed by the cache.
 */
declare type MemoryMethod = () => Promise<number>;
/**
 * Get the most recent updated or added record.
 */
declare type RecentMethod = () => Promise<Record | undefined>;
/**
 * Get the amount of records in the cache.
 */
declare type SizeMethod = () => Promise<number>;
/**
 * Check whether the cache has a specific record.
 */
declare type HasMethod = (key: Key) => Promise<boolean>;
/**
 * Delete a record from the cache.
 */
declare type DeleteMethod = (key: Key) => Promise<void>;
/**
 * Delete many records from the cache.
 */
declare type DeleteManyMethod = (keys: Key[]) => Promise<void>;
/**
 * Update the value of a record.
 */
declare type UpdateMethod = (key: Key, value: Value, config?: {
    updateAge: boolean;
}) => Promise<void>;
/**
 * Update the values of many records.
 */
declare type UpdateManyMethod = (records: [Key, Value][], config: {
    updateAge: boolean;
}) => Promise<void>;
declare const memoryCache: MemoryCache;
export default memoryCache;
