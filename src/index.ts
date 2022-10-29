import bytes from '@azury/bytes'
import ms from 'ms'
import type { Unit } from '@azury/bytes/types/unit'

export class Cache {
  private autodelete: boolean
  private maximumAge: number
  private maximumAmount: number
  private maximumRecordSize: number

  private store: Map<any, { v: any, e: number }>

  private async rmOldest(amount: number): Promise<void> {
    let oldestAge = Date.now()
    , oldestKey

    for (const e of this.store) {
      if (e[1].e > oldestAge) continue

      oldestAge = e[1].e
      oldestKey = e[0]
    }

    if (oldestKey)
      this.store.delete(oldestKey)

    amount--

    if (amount > 0)
      return await this.rmOldest(amount)
  }

  private async rmOveraged() {
    for (const record of this.store) {
      if (record[1].e <= Date.now())
        this.store.delete(record[0])
    }
  }

  constructor(options?: { autodelete?: boolean, maximumAge?: number | string, maximumAmount?: number, maximumRecordSize?: number | Unit }) {
    this.autodelete = options?.autodelete ?? false
    this.maximumAge = typeof options?.maximumAge === 'string' ? ms(options.maximumAge) : !options?.maximumAge ? 600000 : options.maximumAge * 1000
    this.maximumAmount = options?.maximumAmount ?? 10000
    // @ts-ignore
    this.maximumRecordSize = typeof options?.maximumRecordSize === 'string' ? bytes(options.maximumRecordSize) : !options?.maximumRecordSize ? bytes('10 KB') : options.maximumRecordSize

    this.store = new Map()
  }

  async add(key: unknown, value: unknown, maxAge?: number | string) {
    if (this.autodelete)
      await this.rmOveraged()

    if (this.store.size + 1 > this.maximumAmount)
      await this.rmOldest(1)

    const data = {
      v: value,
      e: Date.now() + (!maxAge ? this.maximumAge : typeof maxAge === 'string' ? ms(maxAge) : maxAge * 1000)
    }

    const size = JSON.stringify({ key, data }).length

    if (size > this.maximumRecordSize)
      return

    this.store.set(key, data)
  }

  async addMany(...records: ([unknown, unknown] | [unknown, unknown, number | string])[]) {
    if (this.autodelete)
      await this.rmOveraged()

    if (this.store.size + records.length > this.maximumAmount)
      await this.rmOldest(this.store.size + records.length - this.maximumAmount)

    for (const [key, value, maxAge] of records) {
      const data = {
        v: value,
        e: Date.now() + (!maxAge ? this.maximumAge : typeof maxAge === 'string' ? ms(maxAge) : maxAge)
      }

      const size = JSON.stringify({ key, data }).length

      if (size > this.maximumRecordSize)
        continue

      this.store.set(key, data)
    }
  }

  async get(key: unknown) {
    const entry = this.store.get(key)

    if (!entry) return

    if (entry.e > Date.now())
      return entry.v
    
    this.store.delete(key)
  }

  async * getMany(...keys: unknown[]): AsyncIterable<any | undefined> {
    for (const key of keys) {
      const record = this.store.get(key)

      if (!record) {
        yield undefined
      } else if (record.e <= Date.now()) {
        this.store.delete(key)

        yield undefined
      } else {
        yield record.v
      }
    }
  }

  async update(key: unknown, value: unknown) {
    const record = this.store.get(key)

    if (!record) return

    const data = {
      v: value,
      e: record.e + this.maximumAge * .75
    }

    const size = JSON.stringify({ key, data }).length

    if (size > this.maximumRecordSize)
      return

    this.store.set(key, {
      v: value,
      e: record.e + this.maximumAge * .75
    })
  }

  async updateMany(...records: [unknown, unknown][]) {
    for (const [key, value] of records) {
      const record = this.store.get(key)

      if (!record) continue

      const data = {
        v: value,
        e: record.e + this.maximumAge * .75
      }
  
      const size = JSON.stringify({ key, data }).length
  
      if (size > this.maximumRecordSize)
        continue

      this.store.set(key, {
        v: value,
        e: record.e + this.maximumAge * .75
      })
    }
  }

  async remove(key: unknown) {
    this.store.delete(key)
  }

  async removeMany(...keys: unknown[]) {
    if (keys.length === 0)
      this.store.clear()
    else
      for (const key of keys)
        this.store.delete(key)
  }

  async has(key: unknown) {
    const record = this.store.get(key)

    if (!record)
      return false

    if (record.e > Date.now())
      return true

    this.store.delete(key)

    return false
  }

  async size() {
    const replacer = (key: unknown, value: unknown) => {
      if (value instanceof Map)
        return {
          dataType: 'Map',
          value: [...value]
        }

      return value
    }

    return JSON.stringify(this.store, replacer).length
  }

  async keys() {
    return [...this.store.keys()]
  }

  async * values(): AsyncIterable<any> {
    for (const value of this.store.values())
      yield (value.v)
  }

  async clear() {
    this.rmOveraged()
  }
}
