/*!
 * Devyl's Cache v1.0.3
 * © 2021 - Samuel Kopp
 * Code licensed under Apache-2.0
 */

export default class cache {
  // contructor
  constructor(config) {
    this.max = config.max || Infinity
    this.maxAge = config.maxAge || 900
    this.maxLength = config.length || Infinity
    this.store = []
  }

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

  purge = async () => {
    // reset store
    store = []

    // let user know everything went alright
    return true
  }
}