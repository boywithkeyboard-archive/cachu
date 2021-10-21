let store = []
let max = Infinity
let maxAge = Infinity

export async function global(config) {
  max = config.max ?? Infinity
  maxAge = config.maxAge ?? Infinity
}

export async function setItem(key, value) {
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

export async function getItem(key) {
  if (!key) return null

  const index = store.findIndex(i => i.key === key)
  if (index === -1) return null

  store = store.filter(i => (Date.now() - i.createdAt < maxAge * 1000) || (i.key === key))

  const item = store[index]
  item.createdAt = Date.now()

  return item.value
}

export async function updateItem(key, value) {
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

export async function viewItem(key) {
  if (!key) return null

  const index = store.findIndex(i => i.key === key)
  if (index === -1) return null

  const item = store[index]
  return item.value
}

export async function hasItem(key) {
  try {
    if (!key) return false

    const index = store.findIndex(i => i.key === key)
    if (index === -1) return false
  } catch {
    return false
  }

  return true
}

export async function deleteItem(key) {
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

export async function prune() {
  try {
    store = store.filter(i => Date.now() - i.createdAt < maxAge * 1000)
  } catch {
    return false
  }

  return true
}

export async function purge() {
  store = []

  return true
}

export async function getItems() {
  try {
    return store.map(i => delete i.createdAt)
  } catch {
    return null
  }
}

export async function getAmountOfItems() {
  return store.length
}

export async function getItemsByCondition(condition) {
  if (!condition) return null

  return store.filter(i => !condition(i))
}

export async function purgeItemsByCondition (condition) {
  if (!condition) return false

  store = store.filter(i => !condition(i))

  return true
}

export async function getValuesOfItems() {
  if (store.length === 0) return null

  return store.map(i => {
    delete i.key
    delete i.createdAt
  })
}

export async function getKeysOfItems() {
  if (store.length === 0) return null

  return store.map(i => {
    delete i.value
    delete i.createdAt
  })
}