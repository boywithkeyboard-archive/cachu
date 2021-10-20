export default class cachu {
  private max: Number
  private maxAge: Number
  private store: Array<Object>

  constructor(max?: Number, maxAge?: Number) {
    this.max = max ?? Infinity
    this.maxAge = maxAge ?? Infinity
    this.store = [Object]
  }

  setItem = async (key: String|Number, value: any): Promise<Boolean> => {
    if (!key || !value) return false

    const index: Number = this.store.findIndex((i: any) => i.key === key)
    if (index !== -1) return false

    if (this.store.length === this.max) {
      const max: any = this.store.reduce((prev: any, current: any) => (prev.maxAge < current.maxAge) ? prev : current)
      const i = this.store.findIndex((i: any) => i.key === max.key)
      this.store.splice(i, 1)
    }

    const item: Object = {
      key: key,
      value: value,
      createdAt: Date.now()
    }

    this.store = this.store.filter((i: any) => (Date.now() - i.createdAt < this.maxAge) && (i.key !== key))
    this.store.push(item)

    return true
  }

  getItem = async (key: String|Number): Promise<any> => {
    if (!key) return null

    const index = this.store.findIndex((i: any) => i.key === key)
    if (index === -1) return null

    this.store = this.store.filter((i: any) => (Date.now() - i.createdAt < this.maxAge) || (i.key === key))

    const item: any = this.store[index]
    item.createdAt = Date.now()

    return item.value
  }

  updateItem = async (key: String|Number, value: any): Promise<Boolean> => {
    if (!key || !value) return false

    const index = this.store.findIndex((i: any) => i.key === key)
    if (index === -1) return false

    this.store[index] = {
      key: key,
      value: value,
      createdAt: Date.now()
    }

    return true
  }

  viewItem = async (key: String|Number): Promise<any> => {
    if (!key) return null

    const index = this.store.findIndex((i: any) => i.key === key)
    if (index === -1) return null

    const item: any = this.store[index]
    return item.value
  }

  hasItem = async (key: String|Number): Promise<Boolean> => {
    try {
      if (!key) return false

      const index = this.store.findIndex((i: any) => i.key === key)
      if (index === -1) return false
    } catch {
      return false
    }

    return true
  }

  deleteItem = async (key: String|Number): Promise<Boolean> => {
    try {
      if (!key) return false
      
      const index = this.store.findIndex((i: any) => i.key === key)
      if (index === -1) return false

      this.store.splice(index, 1)
    } catch {
      return false
    }

    return true
  }

  prune = async (): Promise<Boolean> => {
    try {
      this.store = this.store.filter((i: any) => Date.now() - i.createdAt < this.maxAge)
    } catch {
      return false
    }

    return true
  }

  purge = async (): Promise<Boolean> => {
    this.store = []

    return true
  }

  getItems = async (): Promise<Object[]> => {
    try {
      return this.store.map((i: any) => delete i.createdAt)
    } catch {
      return null
    }
  }

  getAmountOfItems = async (): Promise<Number> => {
    return this.store.length
  }

  getItemsByCondition = async (condition: Function): Promise<Object[]> => {
    if (!condition) return null

    return this.store.filter(i => !condition(i))
  }
  
  purgeItemsByCondition = async (condition: Function): Promise<boolean> => {
    if (!condition) return false

    this.store = this.store.filter(i => !condition(i))

    return true
  }

  getValuesOfItems = async (): Promise<any[]> => {
    if (this.store.length === 0) return null

    return this.store.map((i: any) => {
      delete i.key
      delete i.createdAt
    })
  }

  getKeysOfItems = async () => {
    if (this.store.length === 0) return null

    return this.store.map((i: any) => {
      delete i.value
      delete i.createdAt
    })
  }
}