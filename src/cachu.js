/*!
 * cachu v1.0.9
 * © 2021 - Samuel Kopp
 * Code licensed under Apache-2.0
 */

export default class cachu {
  /**
  * **Create a new cache instance.**
  * 
  * @param {{ max: number, maxAge: number, maxLength: number }} config
  * @param {number} config.max - maximum amount of items
  * @param {number} config.maxAge - maximum age of each item
  * @param {number} config.maxLength - maximum length of each item's value
  * 
  * *Will add a new item to the cache and return `true` or `false` if something went wrong.*
  */

  constructor(config) {
    if (typeof config !== 'object') return

    this.max = config.max || Infinity
    this.maxAge = config.maxAge || 900
    this.maxLength = config.maxLength || Infinity
    this.store = []
  }

  /**
  * **Set a new item.**
  * 
  * @param key - something unique
  * @param value - can be of any type, doesn't have to be unique
  * 
  * *Will add a new item to the cache and return `true` or `false` if something went wrong.*
  */

  setKey = async (key, value) => {
    // make sure key and value are valid
    if (!key || !value) return false

    // make sure key is unique
    const index = this.store.findIndex(i => i.key === key)

    // item doesn't exist in store
    if (index !== -1) return false

    // if key is a string and longer than the maximum length
    if (typeof value === 'string' && value.length > this.maxLength) return false

    // if cache has already hit the maximum amount of items, delete the least-recently used one
    if (this.store.length === this.max) {
      const max = await this.store.reduce((prev, current) => (prev.maxAge < current.maxAge) ? prev : current)
      const i = this.store.findIndex(i => i.key === max.key)
      this.store.splice(i, 1)
    }

    // create item
    const item = {
      key: key,
      value: value,
      createdAt: Date.now()
    }

    // delete all items exceeding max age except this one
    this.store = this.store.filter(i => (Date.now() - i.createdAt < this.maxAge * 1000) && (i.key !== key))

    // push item to store
    this.store.push(item)

    // let user know everything went alright
    return true
  }

  /**
  * **Get a item.**
  * 
  * @param key - the key of the item
  * 
  * *Will return either the value of the item or `null` if it doesn't exist.* 
  */

  getKey = async (key) => {
    // make sure key and value are valid
    if (!key) return null

    // search for item
    const index = this.store.findIndex(i => i.key === key)

    // item doesn't exist in store
    if (index === -1) return null

    // get item
    const item = this.store[index]

    // delete all items exceeding max age except this one
    this.store = this.store.filter(i => (Date.now() - i.createdAt < this.maxAge * 1000) || (i.key === key))

    // update max age of item
    item.createdAt = Date.now()

    // return value
    return item.value
  }

  /**
  * **Update a item.**
  * 
  * @param key - the key of the item
  * @param value - the new value
  * 
  * *Will return either `true` or `false` if the item doesn't exist or something went wrong.* 
  */

  updateKey = async (key, value) => {
    // make sure key and value are valid
    if (!key || !value) return false

    // search for item
    const index = this.store.findIndex(i => i.key === key)
    
    // item doesn't exist in store
    if (index === -1) return false

    // update item
    this.store[index] = {
      key: key,
      value: value,
      createdAt: Date.now()
    }

    // let user know everything went alright
    return true
  }

  /**
  * **Steal a item.**
  * 
  * @param key - the key of the item
  * 
  * *Will return either the value of the item or `null` if it doesn't exist.*
  */

  stealKey = async (key) => {
    // make sure key and value are valid
    if (!key) return null

    // search for item
    const index = this.store.findIndex(i => i.key === key)

    // item doesn't exist in store
    if (index === -1) return null

    // get item
    const item = this.store[index]

    // delete all items exceeding max age except this one
    this.store = this.store.filter(i => (Date.now() - i.createdAt < this.maxAge * 1000) || (i.key === key))

    // return value
    return item.value
  }

  /**
  * **Check if the cache has a item.**
  * 
  * @param key - the key of the item
  * 
  * *Will return either `true` or `false` if the item doesn't exist.*
  */

  hasKey = async (key) => {
    // make sure key and value are valid
    if (!key) return false

    // search for item
    const index = this.store.findIndex(i => i.key === key)

    // item doesn't exist in store
    if (index === -1) return false

    // found item
    return true
  }

  /**
  * **Check if the cache has a item.**
  * 
  * @param value - the value of the item
  * 
  * *Will return either `true` or `false` if the item doesn't exist.*
  */

  hasValue = async (value) => {
    // make sure key and value are valid
    if (!value) return false

    // search for item
    const index = this.store.findIndex(item => item.value === value)

    // item doesn't exist in store
    if (index === -1) return false

    // found item
    return true
  }

  /**
  * **Remove a item.**
  * 
  * @param key the key of the item
  * 
  * *Will return either `true` or `false` if the item doesn't exist.*
  */

  deleteKey = async (key) => {
    // make sure key and value are valid
    if (!key) return false

    // search for item
    const index = this.store.findIndex(i => i.key === key)

    // item doesn't exist in store
    if (index === -1) return false

    // remove item from store
    this.store.splice(index, 1)

    // let user know everything went alright
    return true
  }

  /**
  * **Purge the cache.**
  * 
  * Will clear the cache and return `true`.
  */

  purge = async () => {
    // reset store
    store = []

    // let user know everything went alright
    return true
  }
}