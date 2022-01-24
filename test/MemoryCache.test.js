import { MemoryCache } from '../build/node.js'
import { generateEntries } from './utilities'

test('1. write (many), read (many) and check for entries', async () => {
  const cache = new MemoryCache({
    maxAge: 100 // 100 seconds
  })

  // TEST OUT SOME DIFFERENT TYPES
  const keyOfSecondEntry = ['some', 2, 'shitty array']
  const valueOfSecondEntry = { keyOne: 'hello', keyTwo: 'world' }

  await cache.writeMany([
    {
      key: 1,
      value: 'first'
    },
    {
      key: keyOfSecondEntry,
      value: valueOfSecondEntry
    }
  ])

  expect(await cache.has(1)).toBe(true)
  expect(await cache.has(keyOfSecondEntry)).toBe(true)
  expect(await cache.has(3)).toBe(false)

  expect(await cache.getMany([1, keyOfSecondEntry])).toStrictEqual(['first', valueOfSecondEntry])

  setTimeout(async () => {
    await cache.write('third', 69)

    expect(await cache.get(1)).toBe(null)
    expect(await cache.get(keyOfSecondEntry)).toBe(null)

    expect(await cache.has(1)).toBe(false)
    expect(await cache.has(keyOfSecondEntry)).toBe(false)
    expect(await cache.has('third')).toBe(true)

    expect(await cache.get('third')).toBe(69)
  }, 101 * 1000)
})

test('2. grab (many) and steal (many) entries', async () => {
  const cache = new MemoryCache({
    maxAge: 100 // 100 seconds
  })

  // GENERATE 8 ENTRIES
  await generateEntries(cache, 8)

  // GRAB A SINGLE ENTRY
  expect(await cache.grab(1)).toBe('smth1')

  // GRAB MULTIPLE ENTRIES
  expect(await cache.grabMany([2, 3, 4])).toStrictEqual(['smth2', 'smth3', 'smth4'])

  // GRAB A NON-EXISTENT ENTRY
  expect(await cache.grab(99)).toBe(null)

  // GRAB MULTIPLE NON-EXISTENT ENTRIES
  expect(await cache.grabMany([98, 99])).toStrictEqual([null, null])

  // GRAB A EXISTENT AND NON-EXISTENT ENTRY
  expect(await cache.grabMany([1, 99])).toStrictEqual(['smth1', null])

  // STEAL A SINGLE ENTRY
  expect(await cache.has(1)).toBe(true)
  expect(await cache.steal(1)).toBe('smth1')
  expect(await cache.has(1)).toBe(false)

  // STEAL A NON-EXISTENT ENTRY
  expect(await cache.steal(99)).toBe(null)

  // STEAL MANY ENTRIES
  expect(await cache.has(2)).toBe(true)
  expect(await cache.has(3)).toBe(true)
  expect(await cache.has(4)).toBe(true)
  expect(await cache.stealMany([2, 3, 4])).toStrictEqual(['smth2', 'smth3', 'smth4'])
  expect(await cache.has(2)).toBe(false)
  expect(await cache.has(3)).toBe(false)
  expect(await cache.has(4)).toBe(false)

  // STEAL MANY NON-EXISTENT ENTRIES
  expect(await cache.stealMany([98, 99])).toStrictEqual([null, null])

  // STEAL SOME EXISTENT AND NON-EXISTENT ENTRIES
  expect(await cache.stealMany([99, 5])).toStrictEqual([null, 'smth5'])
  expect(await cache.has(5)).toBe(false)
})

test('3. update (many) and purge (many) entries', async () => {
  const cache = new MemoryCache()

  // GENERATE 6 ENTRIES
  await generateEntries(cache, 6)

  // UPDATE A SINGLE ENTRY
  expect(await cache.get(1)).toBe('smth1')
  await cache.update(1, 'smth else')
  expect(await cache.get(1)).toBe('smth else')

  // UPDATE A NON-EXISTENT ENTRY
  await cache.update(99, 'lol')

  // UPDATE MANY ENTRIES
  expect(await cache.get(4)).toBe('smth4')
  expect(await cache.get(6)).toBe('smth6')
  await cache.updateMany([
    {
      key: 4,
      value: 'smth else'
    },
    {
      key: 6,
      value: 'smth else 2'
    }
  ])
  expect(await cache.get(4)).toBe('smth else')
  expect(await cache.get(6)).toBe('smth else 2')

  // UPDATE MANY NON-EXISTENT ENTRIES
  await cache.updateMany([
    {
      key: 98,
      value: 'lol'
    },
    {
      key: 99,
      value: 'cool'
    }
  ])
  expect(await cache.has(98)).toBe(false)
  expect(await cache.has(99)).toBe(false)

  // UPDATE SOME EXISTENT AND SOME NON-EXISTENT ENTRIES
  await cache.updateMany([
    {
      key: 5,
      value: 'five'
    },
    {
      key: 99,
      value: 'cool'
    }
  ])
  expect(await cache.get(5)).toBe('five')
})

test('4. get keys, values, and amount of entries', async () => {
  const cache = new MemoryCache()

  // GENERATE 4 ENTRIES
  await generateEntries(cache, 4)

  // TEST ALL THREE FEATURES
  expect(await cache.getKeysOfEntries()).toStrictEqual([1, 2, 3, 4])
  expect(await cache.getValuesOfEntries()).toStrictEqual(['smth1', 'smth2', 'smth3', 'smth4'])
  expect(await cache.getAmountOfEntries()).toBe(4)
})

test('5. prune cache', async () => {
  const cache = new MemoryCache()

  // GENERATE 6 ENTRIES
  await generateEntries(cache, 6)
  expect(await cache.getAmountOfEntries()).toBe(6)

  setTimeout(async () => {
    // SHOULD RESIST THE PRUNING
    await cache.write(7, 'smth7')

    // PRUNE CACHE
    await cache.prune()

    // ONLY THE ENTRY WITH KEY '7' SHOULD BE LEFT
    expect(await cache.getAmountOfEntries()).toBe(1)
    expect(await cache.has(7)).toBe(true)
  }, 101 * 1000)
})

test('6. get consumed memory', async () => {
  const cache = new MemoryCache()
  expect(typeof (await cache.getConsumedMemory())).toBe('number')
})