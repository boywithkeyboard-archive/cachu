import ms from 'ms'
import { Action } from '../types'

abstract class Cache {
  protected __eventListeners: { [key: string]: Function }
  protected __recentEntry: { key: any, value: any, expiresAt?: number } | undefined
  protected __maxAge: number
  protected __maxAmount: number
  protected __webhook: string | undefined
  protected __autoclear: boolean

  constructor(config?: {
    maxAge?: string | number
    maxAmount?: number
    webhook?: string
    autoclear?: boolean
  }) {
    config = config ?? {}

    this.__eventListeners = {}

    this.__maxAge = typeof config.maxAge === 'number' ? config.maxAge * 1000 : typeof config.maxAge === 'string' ? ms(config.maxAge) : ms('10m')
    this.__maxAmount = config.maxAmount ?? 10000

    this.__autoclear = config.autoclear ?? false

    if (typeof config.webhook === 'string')
      this.__webhook = config.webhook
  }

  abstract set(key: any, value: any, maxAge?: string | number): Promise<void>

  abstract setMany(entries: ([any, any, number | string] | [any, any])[]): Promise<void>

  abstract get(key: any, config?: {
    validate?: boolean
    delete?: boolean
  }): Promise<any>

  abstract getMany(keys: any[], config?: {
    validate?: boolean
    delete?: boolean
  }): Promise<any[]>

  abstract update(key: any, value: any): Promise<void>

  abstract updateMany(entries: [any, any][]): Promise<void>

  abstract delete(key: any): Promise<void>

  abstract deleteMany(keys: any[]): Promise<void>

  abstract has(key: any): Promise<boolean>

  abstract size(): Promise<number>

  abstract keys(): Promise<any[] | undefined>

  abstract values(): Promise<any[] | undefined>

  abstract clear(): Promise<void>

  abstract recent(): Promise<{
    key: any
    value: any
    expiresAt?: number
  } | undefined>

  abstract maxAge(maxAge?: string | number): Promise<number>

  abstract maxAmount(maxAmount?: number): Promise<number>

  abstract each(action: Action): Promise<void>

  abstract on(): Promise<void>
}

export default Cache
