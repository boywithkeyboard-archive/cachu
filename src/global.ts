let store: Array<any> = []
, maxAmount = Infinity
, maxAge = Infinity

interface Configuration {
  maxAge: number | undefined;
  maxAmount: number | undefined;
}

export default async (config: Configuration) => {
  // set config
  maxAmount = config.maxAmount ?? Infinity
  maxAge = config.maxAge ?? Infinity
}

export const set = async (key: {}, value: {}) => {
  // validate uniqueness of key
  const index = store.findIndex(i => i[0] === key)
  if (index !== -1) return false

  // remove outdated items
  store = store.filter(i => Date.now() - i[2] < maxAge * 1000)

  // remove oldest item if store holds too many items
  if (store.length === maxAmount) {
    const max = store.reduce((previous, current) => (previous[2] < current[2]) ? previous : current)
    store.splice(store.findIndex(i => i[0] === max[0]), 1)
  }

  // add new item
  store.push([key, value, Date.now()])

  return true
}

export const get = async (key: {}) => {
  // remove outdated items
  store = store.filter(i => Date.now() - i[2] < maxAge * 1000)

  // search for item
  const index = store.findIndex(i => i[0] === key)
  if (index === -1) return null

  // get item
  const item = store[index]

  // return value of item
  return item[1]
}

export const view = async (key: {}) => {
  // remove outdated items
  store = store.filter(i => (Date.now() - i[2] < maxAge * 1000) || (i[0] === key))

  // search for item
  const index = store.findIndex(i => i[0] === key)
  if (index === -1) return null

  // get item
  const item = store[index]

  // return value of item
  return item[1]
}

export const update = async (key: {}, value: {}) => {
  // search for item
  const index = store.findIndex(i => i[0] === key)
  if (index === -1) return false

  // update item
  store[index] = [key, value, Date.now()]

  return true
}

export const has = async (key: {}) => {
  // search for item
  const index = store.findIndex(i => i[0] === key)
  if (index === -1) return false

  return true
}

export const purge = async (key: {}) => {
  // search for item
  const index = store.findIndex(i => i[0] === key)
  if (index === -1) return false

  // remove item
  store.splice(index, 1)

  return true
}

export const prune = async () => {
  // remove outdated items
  if (store.length > 0) store = store.filter(i => Date.now() - i[2] < maxAge * 1000)

  return true
}

export const destroy = async () => {
  // reset store
  store = []

  return true
}

export const purgeMany = async (keys: Array<any>) => {
  // purge each item
  for (const key of keys) 
    await purge(key)

  return true
}

export const getMany = async (keys: Array<any>) => {
  // create the array
  const items = []

  // get each item
  for (const key of keys) {
    const item = await get(key)
    if (item !== null || item !== undefined) items.push(item)
  }

  return items
}

export const purgeManyByCondition = async (condition: Function) => {
  // purge each item
  store = store.filter(item => !condition(item))

  return true
}

export const getManyByCondition = async (condition: Function) => {
  // return items
  return store.filter(item => condition(item))
}

export const getAmountOfItems = async () => {
  return store.length
}

export const getValuesOfItems = async () => {
  if (store.length === 0) return

  return store.map(item => item[1])
}

export const getKeysOfItems = async () => {
  if (store.length === 0) return

  return store.map(item => item[0])
}

export const each = async (action: Function) => {
  // execute action on each item
  store.forEach(async item => {
    await action(item)
  })

  return true
}