# cachu

Simple, minimalistic key-value cache, created by [**Azury**](https://github.com/azurystudios).

> 💪 Compatible with Node.js [v16](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md) and [v17](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V17.md) 😺🔥

### Why use it?

- fully asynchronous
- small n' easy
- zero dependencies

## Installation

### Install the Package

Install it using your favorite package manager.

```sh-session
npm i cachu
yarn add cachu
```

### Class Instance

Recommended if you need multiple caches.

```js
import { Instance } from 'cachu'

const cache = new Instance({
  max: 10, // cache can contain up to 10 items
  maxAge: 60 // delete items after a minute
})

const try = async () => {
  await cache.setItem(123, 'hello world')
  console.log(await cache.getItem(123))
}

try()
```

### Global Instance

Recommended if you need only one cache or want to configure cachu globally.

```js
import cachu, { setItem, getItem } from 'cachu'

// configure cachu globally (optional)
cachu({
  max: 10, // cache can contain up to 10 items
  maxAge: 60 // delete items after a minute
})

const try = async () => {
  await setItem(123, 'hello world')
  console.log(await getItem(123))
}

try()
```

## API

### Configuration

- [`maxAge`](https://github.com/azurystudios/cachu/wiki/configuration#max-age) to set the **maximum age** for each item in the store
- [`maxAmount`](https://github.com/azurystudios/cachu/wiki/configuration#max-amount) to set the **maximum size** for the store

### Features

Stable:

- [`setItem(key, value, maxAge)`](https://github.com/azurystudios/cachu/wiki/features#set-item)
- [`getItem(key)`](https://github.com/azurystudios/cachu/wiki/features#get-item)
- [`updateItem(key, value)`](https://github.com/azurystudios/cachu/wiki/features#update-item)
- [`viewItem(key)`](https://github.com/azurystudios/cachu/wiki/features#view-item)
- [`deleteItem(key)`](https://github.com/azurystudios/cachu/wiki/features#delete-item)
- [`hasItem(key)`](https://github.com/azurystudios/cachu/wiki/features#has-item)
- [`prune()`](https://github.com/azurystudios/cachu/wiki/features#prune)
- [`purge()`](https://github.com/azurystudios/cachu/wiki/features#purge)
- [`getItems()`](https://github.com/azurystudios/cachu/wiki/features#get-items)
- [`getAmountOfItems()`](https://github.com/azurystudios/cachu/wiki/features#get-amount-of-items)
- [`getItemsByCondition(condition)`](https://github.com/azurystudios/cachu/wiki/features#get-items-by-condition)
- [`purgeItemsByCondition(condition)`](https://github.com/azurystudios/cachu/wiki/features#purge-items-by-condition)
- [`getValuesOfItems()`](https://github.com/azurystudios/cachu/wiki/features#get-values-of-items)
- [`getKeysOfItems()`](https://github.com/azurystudios/cachu/wiki/features#get-keys-of-items)

Prototypes:

- `deleteItemByKey(key)`
- `deleteItemByValue(value)`
- `getInsights()`
- `clearInsights()`
- `on(event)`
- `iterateOverAll(function)`
