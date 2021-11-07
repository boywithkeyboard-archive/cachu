interface Configuration {
    maxAge: number | undefined;
    maxAmount: number | undefined;
}
declare const _default: (config: Configuration) => Promise<void>;
export default _default;
export declare const set: (key: {}, value: {}) => Promise<boolean>;
export declare const get: (key: {}) => Promise<any>;
export declare const view: (key: {}) => Promise<any>;
export declare const update: (key: {}, value: {}) => Promise<boolean>;
export declare const has: (key: {}) => Promise<boolean>;
export declare const purge: (key: {}) => Promise<boolean>;
export declare const prune: () => Promise<boolean>;
export declare const destroy: () => Promise<boolean>;
export declare const purgeMany: (keys: Array<any>) => Promise<boolean>;
export declare const getMany: (keys: Array<any>) => Promise<any[]>;
export declare const purgeManyByCondition: (condition: Function) => Promise<boolean>;
export declare const getManyByCondition: (condition: Function) => Promise<any[]>;
export declare const getAmountOfItems: () => Promise<number>;
export declare const getValuesOfItems: () => Promise<any[] | undefined>;
export declare const getKeysOfItems: () => Promise<any[] | undefined>;
export declare const each: (action: Function) => Promise<boolean>;
