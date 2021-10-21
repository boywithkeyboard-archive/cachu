export default class cachu {
  constructor(max, maxAge) {
    this.max = max ?? Infinity
    this.maxAge = maxAge ?? Infinity
    this.store = []
  }

  setItem = async () => {
    if (!key || !value) return false

    const index = this.store.findIndex(i => i.key === key)
    if (index !== -1) return false

    if (this.store.length === this.max) {
      const max = this.store.reduce((prev, current) => (prev.maxAge < current.maxAge) ? prev : current)
      const i = this.store.findIndex(i => i.key === max.key)
      this.store.splice(i, 1)
    }

    const item = {
      key: key,
      value: value,
      createdAt: Date.now()
    }

    this.store = this.store.filter(i => (Date.now() - i.createdAt < this.maxAge * 1000) && (i.key !== key))
    this.store.push(item)

    return true
  }

  getItem = async (key) => {
    if (!key) return null

    const index = this.store.findIndex(i => i.key === key)
    if (index === -1) return null

    this.store = this.store.filter(i => (Date.now() - i.createdAt < this.maxAge * 1000) || (i.key === key))

    const item = this.store[index]
    item.createdAt = Date.now()

    return item.value
  }

  updateItem = async (key, value) => {
    if (!key || !value) return false

    const index = this.store.findIndex(i => i.key === key)
    if (index === -1) return false

    this.store[index] = {
      key: key,
      value: value,
      createdAt: Date.now()
    }

    return true
  }

  viewItem = async (key) => {
    if (!key) return null

    const index = this.store.findIndex(i => i.key === key)
    if (index === -1) return null

    const item = this.store[index]
    return item.value
  }

  hasItem = async (key) => {
    try {
      if (!key) return false

      const index = this.store.findIndex(i => i.key === key)
      if (index === -1) return false
    } catch {
      return false
    }

    return true
  }

  deleteItem = async (key) => {
    try {
      if (!key) return false
      
      const index = this.store.findIndex(i => i.key === key)
      if (index === -1) return false

      this.store.splice(index, 1)
    } catch {
      return false
    }

    return true
  }

  prune = async () => {
    try {
      this.store = this.store.filter(i => Date.now() - i.createdAt < this.maxAge * 1000)
    } catch {
      return false
    }

    return true
  }

  purge = async () => {
    this.store = []

    return true
  }

  getItems = async () => {
    try {
      return this.store.map(i => delete i.createdAt)
    } catch {
      return null
    }
  }

  getAmountOfItems = async () => {
    return this.store.length
  }

  getItemsByCondition = async (condition) => {
    if (!condition) return null

    return this.store.filter(i => !condition(i))
  }
  
  purgeItemsByCondition = async (condition) => {
    if (!condition) return false

    this.store = this.store.filter(i => !condition(i))

    return true
  }

  getValuesOfItems = async () => {
    if (this.store.length === 0) return null

    return this.store.map(i => {
      delete i.key
      delete i.createdAt
    })
  }

  getKeysOfItems = async () => {
    if (this.store.length === 0) return null

    return this.store.map(i => {
      delete i.value
      delete i.createdAt
    })
  }
}
