declare type Key = {};
declare type Value = {};
declare type Record = {
    key: Key;
    value: Value;
    age: number;
    maxAge?: number;
};
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
declare type Event = 'set' | 'setMany' | 'get' | 'getMany' | 'update' | 'updateMany' | 'delete' | 'deleteMany' | 'has' | 'size' | 'keys' | 'values' | 'clear' | 'memory' | 'recent' | 'maxAge' | 'maxAmount' | 'on';
declare type OnMethod = (event: Event, action: Function) => Promise<void>;
declare type MaxAgeMethod = (newAge?: string | number) => Promise<number>;
declare type MaxAmountMethod = (newAmount?: number) => Promise<number>;
declare type SetMethod = (key: Key, value: Value, maxAge?: number | string) => Promise<Record | undefined>;
declare type SetManyMethod = (records: [Key, Value, number | string | undefined][]) => Promise<(Record | undefined)[]>;
declare type OldestMethod = () => Promise<Record | undefined>;
declare type NewestMethod = () => Promise<Record | undefined>;
declare type GetMethod = (key: Key, config?: {
    validate?: boolean;
    delete?: boolean;
}) => Promise<Record | undefined>;
declare type GetManyMethod = (keys: Key[], config?: {
    reverse?: boolean;
    validate?: boolean;
    delete?: boolean;
}) => Promise<(Record | undefined)[]>;
declare type ClearMethod = () => Promise<void>;
declare type KeysMethod = () => Promise<any[]>;
declare type ValuesMethod = () => Promise<any[]>;
declare type MemoryMethod = () => Promise<number>;
declare type RecentMethod = () => Promise<Record | undefined>;
declare type SizeMethod = () => Promise<number>;
declare type HasMethod = (key: Key) => Promise<boolean>;
declare type DeleteMethod = (key: Key) => Promise<void>;
declare type DeleteManyMethod = (keys: Key[]) => Promise<void>;
declare type UpdateMethod = (key: Key, value: Value, config?: {
    updateAge: boolean;
}) => Promise<void>;
declare type UpdateManyMethod = (records: [Key, Value][], config: {
    updateAge: boolean;
}) => Promise<void>;
export { Record, MemoryCache, OnMethod, DeleteMethod, NewestMethod, OldestMethod, UpdateMethod, UpdateManyMethod, DeleteManyMethod, HasMethod, MaxAgeMethod, SetManyMethod, MaxAmountMethod, SetMethod, RecentMethod, GetMethod, GetManyMethod, KeysMethod, ValuesMethod, MemoryMethod, SizeMethod, ClearMethod };
