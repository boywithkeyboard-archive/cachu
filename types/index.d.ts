interface Configuration {
    maxAge?: number | undefined;
    maxAmount?: number | undefined;
}
export declare class Cachu {
    private maxAmount;
    private maxAge;
    private store;
    /**
     * **Create New Cache Instance**
     *
     * Create a new instance of cachu.
     * @param config
     */
    constructor(config?: Configuration);
    /**
     * **Add New Item**
     *
     * Add a new item to the cache.
     * @param key
     * @param value
     */
    set: (key: {}, value: {}) => Promise<boolean>;
    /**
     * **Get Item**
     *
     * Get the content of an existing item.
     * @param key
     */
    get: (key: {}) => Promise<any>;
    /**
     * **View Item**
     *
     * Get the content of an existing item without removing any overaged items or without returning `null` if it's overaged.
     * @param key
     */
    view: (key: {}) => Promise<any>;
    /**
     * **Update Item**
     *
     * Update the content of an existing item.
     * @param key
     * @param value
     */
    update: (key: {}, value: {}) => Promise<boolean>;
    /**
     * **Has Item**
     *
     * Check if the cache has an item with the specified key.
     * @param key
     */
    has: (key: {}) => Promise<boolean>;
    /**
     * **Purge Item**
     *
     * Delete the item with the specified key.
     * @param key
     */
    purge: (key: {}) => Promise<boolean>;
    /**
     * **Prune Cache**
     *
     * Delete all overaged items manually.
     */
    prune: () => Promise<boolean>;
    /**
     * **Destroy Cache**
     *
     * Delete all items.
     */
    destroy: () => Promise<boolean>;
    /**
     * **Purge Multiple Items**
     *
     * Delete multiple items by their keys.
     * @param keys
     */
    purgeMany: (keys: Array<any>) => Promise<boolean>;
    /**
     * **Get Multiple Items**
     *
     * Get multiple items by their keys.
     * @param keys
     */
    getMany: (keys: Array<any>) => Promise<any[]>;
    /**
     * **Purge Multiple Items Conditionally**
     *
     * Delete multiple items by a specific condition.
     * @param condition
     */
    purgeManyByCondition: (condition: Function) => Promise<boolean>;
    /**
     * **Get Multiple Items Conditionally**
     *
     * Delete multiple items by a specific condition.
     * @param condition
     */
    getManyByCondition: (condition: Function) => Promise<any[]>;
    /**
     * **Get Amount Of Items**
     *
     * Get the amount of items the cache has.
     */
    getAmountOfItems: () => Promise<number>;
    /**
     * **Get Values Of Items**
     *
     * Get an array of all the item values.
     */
    getValuesOfItems: () => Promise<any[] | undefined>;
    /**
     * **Get Keys Of Items**
     *
     * Get an array of all item keys.
     */
    getKeysOfItems: () => Promise<any[] | undefined>;
    /**
     * **Iterate Over Items**
     *
     * Executes a specific function on each item.
     * @param action
     */
    each: (action: Function) => Promise<boolean>;
}
export {};
