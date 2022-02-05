import { MiniCache } from '../build/index.js'
import { generateEntries } from './utilities'

test('1. write, read and check for entries', async () => {
  const cache = new MiniCache({
    maxAge: 1 // a second
  })

  // GENERATE 2 ENTRIES
  await generateEntries(cache, 2)

  // TEST OUT SOME DIFFERENT TYPES
  const keyOfDifferentEntry = ['some', 2, 'shitty array']
  const valueOfDifferentEntry = { keyOne: 'hello', keyTwo: 'world' }

  await cache.write(keyOfDifferentEntry, valueOfDifferentEntry)

  expect(await cache.has(1)).toBe(true)
  expect(await cache.has(keyOfDifferentEntry)).toBe(true)
  expect(await cache.has(3)).toBe(false)

  setTimeout(async () => {
    await cache.write('third', 69)

    expect(await cache.get(1)).toBe(null)
    expect(await cache.get(keyOfDifferentEntry)).toBe(null)

    expect(await cache.has(1)).toBe(false)
    expect(await cache.has(keyOfDifferentEntry)).toBe(false)
    expect(await cache.has('third')).toBe(true)

    expect(await cache.get('third')).toBe(69)
  }, 1 * 1001)
})

test('2. grab and steal entries', async () => {
  const cache = new MiniCache()

  // GENERATE 2 ENTRIES
  await generateEntries(cache, 2)

  // GRAB A SINGLE ENTRY
  expect(await cache.grab(1)).toBe('smth1')

  // GRAB A NON-EXISTENT ENTRY
  expect(await cache.grab(99)).toBe(null)

  // STEAL A SINGLE ENTRY
  expect(await cache.has(1)).toBe(true)
  expect(await cache.steal(1)).toBe('smth1')
  expect(await cache.has(1)).toBe(false)

  // STEAL A NON-EXISTENT ENTRY
  expect(await cache.steal(99)).toBe(null)
})

test('3. update and purge entries', async () => {
  const cache = new MiniCache()

  // GENERATE 1 ENTRY
  await generateEntries(cache, 1)

  // UPDATE A SINGLE ENTRY
  expect(await cache.get(1)).toBe('smth1')
  await cache.update(1, 'smth else')
  expect(await cache.get(1)).toBe('smth else')

  // UPDATE A NON-EXISTENT ENTRY
  await cache.update(99, 'lol')
})

test('4. prune cache', async () => {
  const cache = new MiniCache({
    maxAge: 1
  })

  // GENERATE 6 ENTRIES
  await generateEntries(cache, 6)
  expect(await cache.get(1)).toBe('smth1')
  expect(await cache.get(2)).toBe('smth2')
  expect(await cache.get(3)).toBe('smth3')
  expect(await cache.get(4)).toBe('smth4')
  expect(await cache.get(5)).toBe('smth5')
  expect(await cache.get(6)).toBe('smth6')

  setTimeout(async () => {
    // SHOULD RESIST THE PRUNING
    await cache.write(7, 'smth7')

    // PRUNE CACHE
    await cache.prune()

    // ONLY THE ENTRY WITH KEY '7' SHOULD BE LEFT
    expect(await cache.has(1)).toBe(false)
    expect(await cache.has(2)).toBe(false)
    expect(await cache.has(3)).toBe(false)
    expect(await cache.has(4)).toBe(false)
    expect(await cache.has(5)).toBe(false)
    expect(await cache.has(6)).toBe(false)
    expect(await cache.has(7)).toBe(true)
  }, 1 * 1001)
})

test('5. get consumed memory', async () => {
  const cache = new MiniCache()
  expect(typeof (await cache.getConsumedMemory())).toBe('number')
})