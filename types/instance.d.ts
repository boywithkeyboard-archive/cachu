interface Configuration {
    maxAge: number | undefined;
    maxAmount: number | undefined;
}
export declare class Cachu {
    private maxAmount;
    private maxAge;
    private store;
    constructor(config: Configuration);
    set: (key: {}, value: {}) => Promise<boolean>;
    get: (key: {}) => Promise<any>;
    view: (key: {}) => Promise<any>;
    update: (key: {}, value: {}) => Promise<boolean>;
    has: (key: {}) => Promise<boolean>;
    purge: (key: {}) => Promise<boolean>;
    prune: () => Promise<boolean>;
    destroy: () => Promise<boolean>;
    purgeMany: (keys: Array<any>) => Promise<boolean>;
    getMany: (keys: Array<any>) => Promise<any[]>;
    purgeManyByCondition: (condition: Function) => Promise<boolean>;
    getManyByCondition: (condition: Function) => Promise<any[]>;
    getAmountOfItems: () => Promise<number>;
    getValuesOfItems: () => Promise<any[] | undefined>;
    getKeysOfItems: () => Promise<any[] | undefined>;
    each: (action: Function) => Promise<boolean>;
}
export {};
