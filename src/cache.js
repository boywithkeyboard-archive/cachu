/*!
 * Devyl's Cache v1.0.0
 * © 2021 - Samuel Kopp
 * Code licensed under Apache-2.0
 */

export default class cache {
  // contructor
  constructor(config) {
    this.maxAge = config.maxAge || 900
    this.maxLength = config.length || 100
    this.store = []
  }

  setKey = async (key, value) => {
    // create item
    const item = {
      key: key,
      value: value,
      createdAt: Date.now()
    }

    // push item to store
    this.store.push(item)
  }

  getKey = async (key) => {
    // search for item
    const index = this.store.findIndex(item => item.key === key)

    // item doesn't exist in store
    if (index === -1) return null

    // get item
    const item = this.store[index]

    // delete all items exceeding max age
    this.store = this.store.filter(i => Date.now() - i.createdAt < this.maxAge * 1000)

    // return value
    return item.value
  }

  updateKey = async (key, value) => {
    // search for item
    const index = this.store.findIndex(item => item.key === key)
    
    // item doesn't exist in store
    if (index === -1) return null

    // update item
    this.store[index] = {
      key: key,
      value: value,
      createdAt: Date.now()
    }

    // return value of updated item
    return value
  }

  stealKey = async (key) => {
    // search for item
    const index = this.store.findIndex(item => item.key === key)

    // item doesn't exist in store
    if (index === -1) return null

    // get item
    const item = this.store[index]

    // return value
    return item.value
  }

  hasKey = async (key) => {
    // search for item
    const index = this.store.findIndex(item => item.key === key)

    // item doesn't exist in store
    if (index === -1) return false

    // found item
    return true
  }

  hasValue = async (value) => {
    // search for item
    const index = this.store.findIndex(item => item.value === value)

    // item doesn't exist in store
    if (index === -1) return false

    // found item
    return true
  }

  deleteKey = async (key) => {
    // search for item
    const index = this.store.findIndex(item => item.key === key)

    // item doesn't exist in store
    if (index === -1) return

    // remove item from store
    this.store.splice(index, 1)
  }

  purge = async () => {
    // reset store
    store = []
  }
}