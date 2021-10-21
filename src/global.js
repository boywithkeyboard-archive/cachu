let store = []
let max = Infinity
let maxAge = Infinity

async function global(config) {
  max = config.max ?? Infinity
  maxAge = config.maxAge ?? Infinity
}

async function setItem(key, value) {
  if (!key || !value) return false

  const index = store.findIndex(i => i.key === key)
  if (index !== -1) return false

  if (store.length === max) {
    const max = store.reduce((prev, current) => (prev.maxAge < current.maxAge) ? prev : current)
    const i = store.findIndex(i => i.key === max.key)
    store.splice(i, 1)
  }

  const item = {
    key: key,
    value: value,
    createdAt: Date.now()
  }

  store = store.filter(i => (Date.now() - i.createdAt < maxAge * 1000) && (i.key !== key))
  store.push(item)

  return true
}

async function getItem(key) {
  if (!key) return null

  const index = store.findIndex(i => i.key === key)
  if (index === -1) return null

  store = store.filter(i => (Date.now() - i.createdAt < maxAge * 1000) || (i.key === key))

  const item = store[index]
  item.createdAt = Date.now()

  return item.value
}

async function updateItem(key, value) {
  if (!key || !value) return false

  const index = store.findIndex(i => i.key === key)
  if (index === -1) return false

  store[index] = {
    key: key,
    value: value,
    createdAt: Date.now()
  }

  return true
}

async function viewItem(key) {
  if (!key) return null

  const index = store.findIndex(i => i.key === key)
  if (index === -1) return null

  const item = store[index]
  return item.value
}

async function hasItem(key) {
  try {
    if (!key) return false

    const index = store.findIndex(i => i.key === key)
    if (index === -1) return false
  } catch {
    return false
  }

  return true
}

async function deleteItem(key) {
  try {
    if (!key) return false
    
    const index = store.findIndex(i => i.key === key)
    if (index === -1) return false

    store.splice(index, 1)
  } catch {
    return false
  }

  return true
}

async function prune() {
  try {
    store = store.filter(i => Date.now() - i.createdAt < maxAge * 1000)
  } catch {
    return false
  }

  return true
}

async function purge() {
  store = []

  return true
}

async function getItems() {
  try {
    return store.map(i => delete i.createdAt)
  } catch {
    return null
  }
}

async function getAmountOfItems() {
  return store.length
}

async function getItemsByCondition(condition) {
  if (!condition) return null

  return store.filter(i => !condition(i))
}

async function purgeItemsByCondition(condition) {
  if (!condition) return false

  store = store.filter(i => !condition(i))

  return true
}

async function getValuesOfItems() {
  if (store.length === 0) return null

  return store.map(i => {
    delete i.key
    delete i.createdAt
  })
}

async function getKeysOfItems() {
  if (store.length === 0) return null

  return store.map(i => {
    delete i.value
    delete i.createdAt
  })
}

export {
  global,
  setItem,
  getItem,
  updateItem,
  viewItem,
  hasItem,
  deleteItem,
  prune,
  purge,
  getItems,
  getAmountOfItems,
  getItemsByCondition,
  purgeItemsByCondition,
  getValuesOfItems,
  getKeysOfItems
}