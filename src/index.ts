import fs from 'fs'

interface Configuration {
  maxAge?: number | undefined;
  maxAmount?: number | undefined;
}

export class Cachu {
  private maxAmount: Number
  private maxAge: Number
  private store: Array<any>

  /**
   * **Create New Cache Instance**
   * 
   * Create a new instance of cachu.
   * @param config
   */
  constructor(config?: Configuration) {
    // check config
    if (!config) config = {}

    // set config
    this.maxAmount = config.maxAmount ?? Infinity
    this.maxAge = config.maxAge ?? Infinity
    this.store = []
  }

  /**
   * **Add New Item**
   * 
   * Add a new item to the cache.
   * @param key
   * @param value
   */
  set = async (key: {}, value: {}) => {
    // validate uniqueness of key
    const index = this.store.findIndex(i => i[0] === key)
    if (index !== -1) return false
  
    // remove outdated items
    this.store = this.store.filter(i => Date.now() - i[2] < this.maxAge.valueOf() * 1000)
  
    // remove oldest item if this.store holds too many items
    if (this.store.length === this.maxAmount) {
      const max = this.store.reduce((previous, current) => (previous[2] < current[2]) ? previous : current)
      this.store.splice(this.store.findIndex(i => i[0] === max[0]), 1)
    }
  
    // add new item
    this.store.push([key, value, Date.now()])
  
    return true
  }

  /**
   * **Get an Item**
   * 
   * Get the content of an existing item.
   * @param key
   */
  get = async (key: {}) => {
    // remove outdated items
    this.store = this.store.filter(i => Date.now() - i[2] < this.maxAge.valueOf() * 1000)
  
    // search for item
    const index = this.store.findIndex(i => i[0] === key)
    if (index === -1) return null
  
    // get item
    const item = this.store[index]
  
    // return value of item
    return item[1]
  }

  /**
   * **View a Item**
   * 
   * Get the content of an existing item without removing any overaged items or without returning `null` if it's overaged.
   * @param key
   */
  view = async (key: {}) => {
    // remove outdated items
    this.store = this.store.filter(i => (Date.now() - i[2] < this.maxAge.valueOf() * 1000) || (i[0] === key))
  
    // search for item
    const index = this.store.findIndex(i => i[0] === key)
    if (index === -1) return null
  
    // get item
    const item = this.store[index]
  
    // return value of item
    return item[1]
  }
  
  /**
   * **Update a Item**
   * 
   * Update the content of an existing item. 
   * @param key
   * @param value
   */
  update = async (key: {}, value: {}) => {
    // search for item
    const index = this.store.findIndex(i => i[0] === key)
    if (index === -1) return false
  
    // update item
    this.store[index] = [key, value, Date.now()]
  
    return true
  }
  
  /**
   * **Has a Item**
   * 
   * Check if the cache has an item with the specified key. 
   * @param key
   */
  has = async (key: {}) => {
    // search for item
    const index = this.store.findIndex(i => i[0] === key)
    if (index === -1) return false
  
    return true
  }
  
  /**
   * **Purge a Item**
   * 
   * Delete the item with the specified key.
   * @param key
   */
  purge = async (key: {}) => {
    // search for item
    const index = this.store.findIndex(i => i[0] === key)
    if (index === -1) return false
  
    // remove item
    this.store.splice(index, 1)
  
    return true
  }
  
  /**
   * **Prune Cache**
   * 
   * Delete all overaged items manually.
   */
  prune = async () => {
    // remove overaged items
    if (this.store.length > 0) this.store = this.store.filter(i => Date.now() - i[2] < this.maxAge.valueOf() * 1000)
  
    return true
  }
  
  /**
   * **Destroy Cache**
   * 
   * Delete all items.
   */
  destroy = async () => {
    // reset this.store
    this.store = []
  
    return true
  }
  
  /**
   * **Purge Many Items**
   * 
   * Delete multiple items by their keys.
   * @param keys
   */
  purgeMany = async (keys: Array<any>) => {
    // purge each item
    for (const key of keys) 
      await this.purge(key)
  
    return true
  }
  
  /**
   * **Get Many Items**
   * 
   * Get multiple items by their keys.
   * @param keys
   */
  getMany = async (keys: Array<any>) => {
    // create the array
    const items = []
  
    // get each item
    for (const key of keys) {
      const item = await this.get(key)
      if (item !== null || item !== undefined) items.push(item)
    }

    // return items (without age)
    // return items.map((item: Array<any>) => item.splice(2, 1))
    return items
  }
  
  /**
   * **Purge Many Items by a Condition**
   * 
   * Delete multiple items by a specific condition.
   * @param condition
   */
  purgeManyByCondition = async (condition: Function) => {
    // purge each item
    this.store = this.store.filter(i => !condition(i))
  
    return true
  }
  
  /**
   * **Get Multiple Items by a Condition**
   * 
   * Delete multiple items by a specific condition.
   * @param condition
   */
  getManyByCondition = async (condition: Function) => {
    // filter items
    const filteredItems = this.store.filter(i => condition(i))

    const itemValues: Array<any> = []
    for (const item of filteredItems) {
      itemValues.push(item[1])
    }

    // return item values
    return itemValues
  }
  
  /**
   * **Get Amount of Items**
   * 
   * Get the amount of items the cache has.
   */
  getAmountOfItems = async () => {
    return this.store.length
  }
  
  /**
   * **Get Values of Items**
   * 
   * Get an array of all the item values.
   */
  getValuesOfItems = async () => {
    if (this.store.length === 0) return
  
    return this.store.map(item => item[1])
  }
  
  /**
   * **Get Keys of Items**
   * 
   * Get an array of all item keys.
   */
  getKeysOfItems = async () => {
    if (this.store.length === 0) return

    return this.store.map(item => item[0])
  }
  
  /**
   * **Execute an Action on Each Item**
   * 
   * Executes a specific function on each item.
   * @param action
   */
  each = async (action: Function) => {
    // execute action on each item
    this.store.forEach(async item => {
      await action(item)
    })
  
    return true
  }
}
