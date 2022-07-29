import { useCache } from '.'

test('add(), addMany(), and has()', async () => {
  const cache = useCache({
    maxAge: 5/1000 // 5ms
  })

  expect(await cache.has(1)).toBe(false)
  await cache.add(1, 'Hello')
  expect(await cache.has(1)).toBe(true)

  const thirdKey = { some: 'key' }

  expect(await cache.has('two')).toBe(false)
  expect(await cache.has(thirdKey)).toBe(false)
  await cache.addMany(
    ['two', [1, 2, 3]],
    [thirdKey, 123]
  )
  expect(await cache.has('two')).toBe(true)
  expect(await cache.has(thirdKey)).toBe(true)

  await new Promise(r => setTimeout(r, 20))

  await cache.add(4, 'four')

  expect(await cache.has(1)).toBe(false)
  expect(await cache.has('two')).toBe(false)
  expect(await cache.has(thirdKey)).toBe(false)
  expect(await cache.has(4)).toBe(true)
})

test('get() and getMany()', async () => {
  const cache = useCache({
    maxAge: 5/1000 // 5ms
  })

  const firstValue = [1, 2, 3]
  const secondKey = { someKey: 'two' }

  await cache.addMany(
    ['one', firstValue, '20s'],
    [secondKey, 123]
  )

  expect(await cache.get('one')).toEqual(firstValue)
  expect(await cache.get(secondKey)).toEqual(123)
  expect(await cache.getMany('one', secondKey)).toEqual([
    firstValue,
    123
  ])

  expect(await cache.get(3)).toBeUndefined()

  await new Promise(r => setTimeout(r, 20))

  await cache.add(3, 'three')

  expect(await cache.getMany(secondKey, 3)).toEqual([
    undefined,
    'three'
  ])
  expect(await cache.get(secondKey)).toBeUndefined()
  expect(await cache.get('one')).toBeDefined()
})

test('update() and updateMany()', async () => {
  const cache = useCache({
    maxAge: 15/1000 // 15ms
  })

  const thirdKey = { some: 'key' }

  await cache.addMany(
    [1, 'Hello'],
    ['two', [1, 2, 3]],
    [thirdKey, 123],
    ['four', 4],
    [5, 'five']
  )

  expect(await cache.get(1)).toBe('Hello')
  expect(await cache.get('two')).toEqual([1, 2, 3])
  expect(await cache.get(thirdKey)).toBe(123)

  await cache.update('two', [2, 3, 4])

  expect(await cache.get('two')).toEqual([2, 3, 4])

  await cache.updateMany(
    [1, thirdKey],
    [thirdKey, 'three']
  )

  expect(await cache.getMany(1, thirdKey)).toEqual([thirdKey, 'three'])
})

test('remove() and removeMany()', async () => {
  const cache = useCache()

  const firstValue = [1, 2, 3]
  const secondKey = { someKey: 'two' }

  await cache.addMany(
    ['one', firstValue, '20s'],
    [secondKey, 123],
    [3, 'three'],
    [4, 'four'],
    [5, 'five'],
  )

  expect(await cache.has('one')).toBe(true)
  expect(await cache.has(secondKey)).toBe(true)
  expect(await cache.has(3)).toBe(true)
  expect(await cache.has(4)).toBe(true)
  expect(await cache.has(5)).toBe(true)

  await cache.remove(secondKey)

  expect(await cache.has('one')).toBe(true)
  expect(await cache.has(secondKey)).toBe(false)
  expect(await cache.has(3)).toBe(true)
  expect(await cache.has(4)).toBe(true)
  expect(await cache.has(5)).toBe(true)

  await cache.removeMany(3, 5)

  expect(await cache.has('one')).toBe(true)
  expect(await cache.has(3)).toBe(false)
  expect(await cache.has(4)).toBe(true)
  expect(await cache.has(5)).toBe(false)

  await cache.removeMany()

  expect(await cache.has('one')).toBe(false)
  expect(await cache.has(4)).toBe(false)
})

test('size()', async () => {
  const cache = useCache()

  const firstValue = [1, 2, 3]
  const secondKey = { someKey: 'two' }

  await cache.addMany([
    ['one', firstValue, '20s'],
    [secondKey, 123]
  ])

  expect(typeof await cache.size()).toBe('number')
})

test('keys()', async () => {
  const cache = useCache()

  const firstValue = [1, 2, 3]
  const secondKey = { someKey: 'two' }

  await cache.addMany(
    ['one', firstValue, '20s'],
    [secondKey, 123]
  )

  expect(await cache.keys()).toEqual(['one', secondKey])
})

test('values()', async () => {
  const cache = useCache()

  const firstValue = [1, 2, 3]
  const secondKey = { someKey: 'two' }

  await cache.addMany(
    ['one', firstValue, '20s'],
    [secondKey, 123]
  )

  expect(await cache.values()).toEqual([firstValue, 123])
})

test('clear()', async () => {
  const cache = useCache({
    maxAge: 5/1000 // 5ms
  })

  const firstValue = [1, 2, 3]
  const secondKey = { someKey: 'two' }

  await cache.addMany(
    ['one', firstValue],
    [secondKey, 123],
    ['third', 3, '20s']
  )

  expect(await cache.has('one')).toBe(true)
  expect(await cache.has(secondKey)).toBe(true)
  expect(await cache.has(secondKey)).toBe(true)

  await new Promise(r => setTimeout(r, 20))

  await cache.clear()

  expect(await cache.has('one')).toBe(false)
  expect(await cache.has('third')).toBe(true)
  expect(await cache.has(secondKey)).toBe(false)
})

test('autodelete', async () => {
  const cache = useCache({
    maxAge: 5/1000, // 5ms
    autodelete: true
  })

  const thirdKey = { some: 'key' }

  await cache.addMany(
    [1, 'one'],
    ['two', [1, 2, 3]],
    [thirdKey, 123]
  )

  expect(await cache.has(1)).toBe(true)
  expect(await cache.has('two')).toBe(true)
  expect(await cache.has(thirdKey)).toBe(true)

  await new Promise(r => setTimeout(r, 20))

  await cache.add(4, 'four')

  expect(await cache.has(1)).toBe(false)
  expect(await cache.has('two')).toBe(false)
  expect(await cache.has(thirdKey)).toBe(false)
  expect(await cache.has(4)).toBe(true)
})
