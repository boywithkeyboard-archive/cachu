export class Cachu {
  constructor(config) {
    // validate config
    if (typeof config !== 'object' || (config.maxAmount && typeof config.maxAmount !== 'number') || (config.maxAge && typeof config.maxAge !== 'number')) return

    // set config
    this.maxAmount = config.maxAmount ?? Infinity
    this.maxAge = config.maxAge ?? Infinity
    this.store = []
  }

  set = async (key, value) => {
    // validate params
    if (!key || !value) return false

    // validate uniqueness of key
    const index = this.store.findIndex(i => i[0] === key)
    if (index !== -1) return false

    // remove outdated items
    this.store = this.store.filter(i => Date.now() - i[2] < this.maxAge * 1000)

    // remove oldest item if store holds too many items
    if (this.store.length === this.maxAmount) {
      const max = this.store.reduce((previous, current) => (previous[2] < current[2]) ? previous : current)
      this.store.splice(this.store.findIndex(i => i[0] === max[0]), 1)
    }

    // add new item
    this.store.push([key, value, Date.now()])

    return true
  }

  get = async (key) => {
    // validate params
    if (!key) return null

    // remove outdated items
    this.store = this.store.filter(i => Date.now() - i[2] < this.maxAge * 1000)

    // search for item
    const index = this.store.findIndex(i => i[0] === key)
    if (index === -1) return null

    // get item
    const item = this.store[index]

    // return value of item
    return item[1]
  }

  view = async (key) => {
    // validate params
    if (!key) return null

    // remove outdated items
    this.store = this.store.filter(i => (Date.now() - i[2] < this.maxAge * 1000) || (i[0] === key))

    // search for item
    const index = this.store.findIndex(i => i[0] === key)
    if (index === -1) return null

    // get item
    const item = this.store[index]

    // return value of item
    return item[1]
  }

  update = async (key, value) => {
    // validate params
    if (!key || !value) return false

    // search for item
    const index = this.store.findIndex(i => i[0] === key)
    if (index === -1) return false

    // update item
    this.store[index] = [key, value, Date.now()]

    return true
  }

  has = async (key) => {
    // validate params
    if (!key) return false

    // search for item
    const index = this.store.findIndex(i => i[0] === key)
    if (index === -1) return false

    return true
  }

  purge = async (key) => {
    // validate params
    if (!key) return false

    // search for item
    const index = this.store.findIndex(i => i[0] === key)
    if (index === -1) return false

    // remove item
    this.store.splice(index, 1)

    return true
  }

  prune = async () => {
    // remove outdated items
    if (this.store.length > 0) this.store = this.store.filter(i => Date.now() - i[2] < this.maxAge * 1000)

    return true
  }

  destroy = async () => {
    // reset store
    this.store = []

    return true
  }

  purgeMany = async (keys) => {
    // validate params
    if (typeof keys !== 'object') return false

    // purge each item
    for (const key of keys) 
      await this.purge(key)

    return true
  }

  getMany = async (keys) => {
    // validate params
    if (typeof keys !== 'object') return

    // create the array
    const items = []

    // get each item
    for (const key of keys) {
      const item = await this.get(key)
      if (item !== null || item !== undefined) items.push(item)
    }

    return items
  }

  purgeManyByCondition = async (condition) => {
    // validate params
    if (typeof condition !== 'function') return false

    // purge each item
    this.store = this.store.filter(item => !condition(item))

    return true
  }

  getManyByCondition = async (condition) => {
    // validate params
    if (typeof condition !== 'function') return false

    // return items
    return this.store.filter(item => condition(item))
  }

  getAmountOfItems = async () => {
    return this.store.length
  }

  getValuesOfItems = async () => {
    if (this.store.length === 0) return

    return this.store.map(item => item[1])
  }

  getKeysOfItems = async () => {
    if (this.store.length === 0) return

    return this.store.map(item => item[0])
  }

  each = async (action) => {
    // validate params
    if (!action) return false

    // execute action on each item
    this.store.forEach(async item => {
      await action(item)
    })

    return true
  }
}
