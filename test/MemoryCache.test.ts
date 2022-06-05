import { MemoryCache } from '../src'

test('set, setMany and has', async () => {
  const cache = new MemoryCache()

  expect(await cache.has(1)).toBe(false)
  await cache.set(1, 'Hello')
  expect(await cache.has(1)).toBe(true)

  const valueOfSecondRecord = [1, 2, 3]
  const keyOfThirdRecord = { someKey: 'three' }
  expect(await cache.has('two')).toBe(false)
  expect(await cache.has(keyOfThirdRecord)).toBe(false)
  await cache.setMany([
    ['two', valueOfSecondRecord],
    [keyOfThirdRecord, 123]
  ])
  expect(await cache.has('two')).toBe(true)
  expect(await cache.has(keyOfThirdRecord)).toBe(true)
})

test('get and getMany', async () => {
  const cache = new MemoryCache({
    maxAge: 5/1000 // 5ms
  })

  const valueOfFirstRecord = [1, 2, 3]
  const keyOfSecondRecord = { someKey: 'two' }
  await cache.setMany([
    ['one', valueOfFirstRecord, '20s'],
    [keyOfSecondRecord, 123],
    [3, 'three']
  ])

  expect(await cache.get('one')).toStrictEqual(valueOfFirstRecord)
  expect(await cache.get(keyOfSecondRecord)).toStrictEqual(123)
  expect(await cache.getMany(['one', keyOfSecondRecord])).toStrictEqual([
    valueOfFirstRecord,
    123
  ])

  // with removal
  expect(await cache.get(3, {
    delete: true
  })).toBeDefined()

  expect(await cache.get(3)).toBeUndefined()

  await new Promise((r) => setTimeout(r, 10))

  // without validation
  expect(await cache.get(keyOfSecondRecord, {
    validate: false
  })).toBeDefined()

  expect(await cache.get('one')).toBeDefined()
})

test('update and updateMany', async () => {
  const cache = new MemoryCache()

  const valueOfFirstRecord = [1, 2, 3]
  const keyOfSecondRecord = { someKey: 'two' }
  await cache.setMany([
    ['one', valueOfFirstRecord],
    [keyOfSecondRecord, 123],
    [3, 'three'],
    [4, 'four']
  ])

  expect(await cache.get('one')).toStrictEqual(valueOfFirstRecord)
  await cache.update('one', 'new value')
  expect(await cache.get('one')).toBe('new value')

  expect(await cache.get(keyOfSecondRecord)).toBe(123)
  expect(await cache.get(3)).toBe('three')
  await cache.updateMany([
    [keyOfSecondRecord, 345],
    [3, 'unicorn']
  ])
  expect(await cache.get(keyOfSecondRecord)).toBe(345)
  expect(await cache.get(3)).toBe('unicorn')
})

test('delete and deleteMany', async () => {
  const cache = new MemoryCache()

  await cache.setMany([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
    [4, 'four']
  ])

  expect(await cache.has(1)).toBe(true)
  expect(await cache.has(2)).toBe(true)
  expect(await cache.has(3)).toBe(true)
  expect(await cache.has(4)).toBe(true)

  await cache.delete(1)

  expect(await cache.has(1)).toBe(false)
  expect(await cache.has(2)).toBe(true)
  expect(await cache.has(3)).toBe(true)
  expect(await cache.has(4)).toBe(true)

  await cache.deleteMany([2, 3])

  expect(await cache.has(1)).toBe(false)
  expect(await cache.has(2)).toBe(false)
  expect(await cache.has(3)).toBe(false)
  expect(await cache.has(4)).toBe(true)
})

test('size, keys and values', async () => {
  const cache = new MemoryCache()

  await cache.setMany([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
    [4, 'four']
  ])

  expect(await cache.size()).toBe(4)
  expect(await cache.keys()).toStrictEqual([1, 2, 3, 4])
  expect(await cache.values()).toStrictEqual(['one', 'two', 'three', 'four'])
})

test('clear', async () => {
  const cache = new MemoryCache({
    maxAge: 5/1000 // 5ms
  })

  await cache.setMany([
    [1, 'one'],
    [2, 'two']
  ])

  expect(await cache.has(1)).toBe(true)
  expect(await cache.has(2)).toBe(true)

  await new Promise((r) => setTimeout(r, 10))

  expect(await cache.has(1)).toBe(true)
  expect(await cache.has(2)).toBe(true)

  await cache.clear()

  expect(await cache.has(1)).toBe(false)
  expect(await cache.has(2)).toBe(false)
})

test('recent', async () => {
  const cache = new MemoryCache()

  expect(await cache.recent()).toBe(undefined)

  await cache.setMany([
    [1, 'one'],
    [2, 'two']
  ])

  expect(await cache.recent()).toStrictEqual({
    key: 2,
    value: 'two',
    expiresAt: expect.any(Number)
  })

  await cache.set(3, 'three')

  expect(await cache.recent()).toStrictEqual({
    key: 3,
    value: 'three',
    expiresAt: expect.any(Number)
  })

  await cache.update(1, 'something different')

  expect(await cache.recent()).toStrictEqual({
    key: 1,
    value: 'something different',
    expiresAt: expect.any(Number)
  })

  await cache.updateMany([
    [1, 'something different'],
    [2, 'something different']
  ])

  expect(await cache.recent()).toStrictEqual({
    key: 2,
    value: 'something different',
    expiresAt: expect.any(Number)
  })
})

test('maxAge and maxAmount', async () => {
  const cache = new MemoryCache()

  expect(await cache.maxAge()).toBe(600000)
  expect(await cache.maxAmount()).toBe(10000)

  expect(await cache.maxAge('1m')).toBe(60000)
  expect(await cache.maxAmount(500)).toBe(500)

  expect(await cache.maxAge()).toBe(60000)
  expect(await cache.maxAmount()).toBe(500)
})

test('memory', async () => {
  const cache = new MemoryCache()

  expect(await cache.memory()).toBeCloseTo(0)

  await cache.setMany([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
    [4, 'four']
  ])

  expect(await cache.memory()).toBeGreaterThan(10)
})
