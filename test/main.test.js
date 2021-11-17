const { Cachu } = require('../build/index.js')

test('create, get, and update item', async () => {
  const cachu = new Cachu()

  // set items
  expect(await cachu.set(1, 'first')).toBe(true)
  expect(await cachu.set(2, 'second')).toBe(true)

  // get first item
  expect(await cachu.get(1)).toBe('first')

  // update & get second item
  expect(await cachu.update(2, 123)).toBe(true)
  expect(await cachu.get(2)).toBe(123)
})

test('check for item, view item, get amount of items, and prune items', async () => {
  const cachu = new Cachu({
    maxAge: 100 // 100 seconds
  })

  // item that expires at first
  await cachu.set(1, 'first')

  // item that expires after the first one
  setTimeout(async () => {
    await cachu.set(2, 'second')
  }, 150 * 1000)

  setTimeout(async () => {
    await cachu.set(3, 'third') // set third item
    expect(await cachu.getAmountOfItems()).toBe(3) // all items should still exist
    expect(await cachu.view(1)).toBe('first') // first item shouldn't be removed yet
    expect(await cachu.get(1)).toBe(null) // first item should be removed now
    expect(await cachu.get(2)).toBe(null) // second item should be also removed now
    expect(await cachu.get(3)).toBe('third') // third item should still exist because it isn't overaged
    expect(await cachu.prune()).toBe(true) // try to delete all overaged items
    expect(await cachu.getAmountOfItems()).toBe(0) // cache shouldn't contain any items
  }, 200 * 1000)
})

test('get keys and values of items', async () => {
  const cachu = new Cachu()

  // set items
  await cachu.set(1, 'first')
  await cachu.set(2, 'second')
  await cachu.set(3, 'third')

  // get keys of items
  expect(await cachu.getKeysOfItems()).toStrictEqual([1, 2, 3])

  // get values of items
  expect(await cachu.getValuesOfItems()).toStrictEqual(['first', 'second', 'third'])
})

test('get/purge many items by condition', async () => {
  const cachu = new Cachu()

  // set items
  await cachu.set(1, 'first')
  await cachu.set(2, 123)
  await cachu.set(3, 'third')

  const item2 = await cachu.get(2)
  expect(typeof item2).toBe('number')

  // get all items having a number as value
  expect(await cachu.getManyByCondition((key, value, age) => {
    return (typeof value === 'number')
  })).toStrictEqual([
    123
  ])

  // get all items having a string as value
  expect(await cachu.getManyByCondition((key, value, age) => {
    return (typeof value === 'string')
  })).toStrictEqual([
    'first',
    'third'
  ])

  // get first and second item
  expect(await cachu.getMany([1, 2])).toStrictEqual([
    'first',
    123
  ])

  // purge multiple items at once
  await cachu.purgeMany([1, 3])

  expect(await cachu.get(1)).toBe(null)
  expect(await cachu.get(2)).toBe(123)
  expect(await cachu.get(3)).toBe(null)
})

test('execute action on each item', async () => {
  const cachu = new Cachu()

  // set items
  await cachu.set(1, 'first')
  await cachu.set(2, 'second')
  await cachu.set(3, 'third')

  // add string to value of each item
  expect(await cachu.each(i => {
    i[1] += ' item'
  })).toBe(true)

  // check if it worked
  expect(await cachu.get(1)).toBe('first item')
})

test('purge one or multiple items, prune items, destroy cache', async () => {
  const cachu = new Cachu({
    maxAge: 200
  })

  await cachu.set(1, 'first')

  setTimeout(async () => {
    await cachu.set(2, 'second')
  }, 100)

  setTimeout(async () => {
    // set more items
    await cachu.set(3, 'third')
    await cachu.set(4, 'fourth')
    await cachu.set(5, 'fifth')
    await cachu.set(6, 123)
    await cachu.set(7, 456)
    await cachu.set(8, 'eighth')

    // remove overaged items
    expect(await cachu.prune()).toBe(true)
    expect(await cachu.getKeysOfItems()).toBe([3, 4, 5, 6])

    // remove third item
    expect(await cachu.get(3)).toBe('third')
    expect(await cachu.purge(3)).toBe(true)
    expect(await cachu.get(3)).toBe(null)

    // purge many
    expect(await cachu.purgeMany([4, 5])).toBe(true)
    expect(await cachu.get(4)).toBe(null)
    expect(await cachu.get(5)).toBe(null)

    // purge many by condition
    expect(await cachu.purgeManyByCondition((key, value, age) => {
      return (typeof value === 'number')
    })).toBe(true)
    expect(await cachu.get(6)).toBe(null)
    expect(await cachu.get(7)).toBe(null)
    expect(await cachu.getAmountOfItems()).toBe(1)
    expect(await cachu.get(8)).toBe('eighth')
  }, 200 * 1000)
})