import ms from 'ms'
import { Event } from '../types'
import Cache from './Cache'

class MemoryCache extends Cache {
  private store: Map<any, { value: any, expiresAt?: number }>
  private consumedMemory: number

  constructor(config?: {
    maxAge?: string | number
    maxAmount?: number
    maxMemory?: number
    webhook?: string
    autoclear?: boolean
  }) {
    super(config)

    this.store = new Map()
    this.consumedMemory = 0
  }

  private async deleteOutdated(amount?: number) {
    
  }

  async set(key: any, value: any, maxAge?: string | number) {
    if (this.__eventListeners.set)
      await this.__eventListeners.set(key, value, maxAge)

    if (this.__autoclear && this.__maxAge !== Infinity)
      await this.deleteOutdated()

    if (this.__autoclear && this.store.size + 1 > this.__maxAmount)
      await this.deleteOutdated(1)

    const data = {
      value,
      ...(typeof maxAge === 'string' ? {
        expiresAt: Date.now() + ms(maxAge)
      } : typeof maxAge === 'number' ? {
        expiresAt: Date.now() + maxAge * 1000
      } : this.__maxAge !== Infinity && {
        expiresAt: Date.now() + this.__maxAge
      })
    }

    this.store.set(key, data)

    this.__recentEntry = {
      key,
      ...data
    }
  }

  async setMany(entries: ([any, any, number | string] | [any, any])[]) {
    if (this.__eventListeners.setMany)
      await this.__eventListeners.setMany(entries)

    if (this.__autoclear && this.__maxAge !== Infinity)
      await this.deleteOutdated()

    if (this.__autoclear && this.store.size + entries.length > this.__maxAmount)
      await this.deleteOutdated((this.store.size + entries.length) - this.__maxAmount)

    for (let e of entries) {
      if (this.store.has(e[0])) continue
  
      const data = {
        value: e[1],
        ...(typeof e[2] === 'string' ? {
          expiresAt: Date.now() + ms(e[2])
        } : typeof e[2] === 'number' ? {
          expiresAt: Date.now() + e[2] * 1000
        } : this.__maxAge !== Infinity && {
          expiresAt: Date.now() + this.__maxAge
        })
      }
  
      this.store.set(e[0], data)
  
      this.__recentEntry = {
        key: e[0],
        ...data
      }
    }
  }

  async get(key: any, config?: {
    validate?: boolean
    delete?: boolean
  }) {
    config = config ?? {}

    if (this.__eventListeners.get)
      await this.__eventListeners.get(key, config)

    const entry = this.store.get(key)
    
    if (!entry) return

    if (config.validate && entry.expiresAt && Date.now() >= entry.expiresAt) {
      this.store.delete(key)
      return
    }

    if (config.delete)
      this.store.delete(key)

    return entry.value
  }

  async getMany(keys: any[], config?: {
    validate?: boolean
    delete?: boolean
  }) {
    config = config ?? {}

    if (this.__eventListeners.getMany)
      await this.__eventListeners.getMany(keys, config)

    let values: any[] = []

    for (let k of keys) {
      const entry = this.store.get(k)
    
      if (!entry) {
        values = [...values, undefined]
        continue
      }
  
      if (config.validate && entry.expiresAt && Date.now() >= entry.expiresAt) {
        this.store.delete(k)

        values = [...values, undefined]
        continue
      }
  
      if (config.delete)
        this.store.delete(k)
  
      values = [...values, entry.value]
    }

    return values
  }

  async update(key: any, value: any) {
    if (this.__eventListeners.update)
      await this.__eventListeners.update(key, value)

    if (this.__autoclear && this.__maxAge !== Infinity)
      await this.deleteOutdated()

    const entry = this.store.get(key)

    if (!entry) return

    const data = {
      value,
      ...(entry.expiresAt && { expiresAt: entry.expiresAt })
    }

    this.store.set(key, data)

    this.__recentEntry = {
      key,
      ...data
    }
  }

  async updateMany(entries: [any, any][]) {
    if (this.__eventListeners.updateMany)
      await this.__eventListeners.updateMany(entries)

    for (let e of entries) {
      const entry = this.store.get(e[0])

      if (!entry) continue
  
      const data = {
        value: e[1],
        ...(entry.expiresAt && { expiresAt: entry.expiresAt })
      }
  
      this.store.set(e[0], data)
  
      this.__recentEntry = {
        key: e[0],
        ...data
      }
    }
  }

  async delete(key: any) {
    if (this.__eventListeners.delete)
      await this.__eventListeners.delete(key)

    this.store.delete(key)
  }

  async deleteMany(keys: any[]) {
    if (this.__eventListeners.deleteMany)
      await this.__eventListeners.deleteMany(keys)

    if (keys.length === 0)
      this.store.clear()

    for (let k of keys)
      this.store.delete(k)
  }

  async has(key: any) {
    if (this.__eventListeners.has)
      await this.__eventListeners.has(key)

    return this.store.has(key)
  }

  async size() {
    if (this.__eventListeners.size)
      await this.__eventListeners.size()

    return this.store.size
  }

  async keys() {
    if (this.__eventListeners.keys)
      await this.__eventListeners.keys()

    return [...this.store.keys()]
  }

  async values() {
    if (this.__eventListeners.values)
      await this.__eventListeners.values()

    let values: any[] = []

    for (let [key, value] of this.store)
      values = [...values, value.value]

    return values
  }

  async clear() {
    if (this.__eventListeners.clear)
      await this.__eventListeners.clear()

    for (let [key, value] of this.store)
      if (value.expiresAt && Date.now() >= value.expiresAt)
        this.store.delete(key)
  }

  async memory() {
    if (this.__eventListeners.memory)
      await this.__eventListeners.memory()

    const data = [...this.store.keys()].toString() + [...this.store.values()].toString()
    , buffer = Buffer.from(data)

    return Buffer.byteLength(buffer)
  }

  async recent() {
    if (this.__eventListeners.recent)
      await this.__eventListeners.recent()

    return this.__recentEntry
  }

  async maxAge(maxAge?: string | number) {
    if (this.__eventListeners.maxAge)
      await this.__eventListeners.maxAge()

    if (!maxAge)
      return this.__maxAge

    this.__maxAge = typeof maxAge === 'number' ? maxAge * 1000 : ms(maxAge)

    return this.__maxAge
  }

  async maxAmount(maxAmount?: number) {
    if (this.__eventListeners.maxAmount)
      await this.__eventListeners.maxAmount()

    if (!maxAmount)
      return this.__maxAmount

    this.__maxAmount = maxAmount

    return maxAmount
  }

  async on(event: Event | 'memory', action: Function) {
    this.__eventListeners[event] = action
  }
}

export default MemoryCache
