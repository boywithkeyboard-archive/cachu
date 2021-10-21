# Cachu

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
import { instance } from 'cachu'

const cache = new instance({
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

Recommended if you need only one cache.

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

- [`maxAge`](https://github.com/azurystudios/cachu/wiki/configuration#maxAge) to set the **maximum age** for each item in the store
- [`max`](https://github.com/azurystudios/cachu/wiki/configuration#max) to set the **maximum size** for the store

### Features

- [`setItem(key, value, maxAge)`](https://github.com/azurystudios/cachu/wiki/features#setItem)
- [`getItem(key)`](https://github.com/azurystudios/cachu/wiki/features#getItem)
- [`updateItem(key, value)`](https://github.com/azurystudios/cachu/wiki/features#updateItem)
- [`viewItem(key)`](https://github.com/azurystudios/cachu/wiki/features#viewItem)
- [`deleteItem(key)`](https://github.com/azurystudios/cachu/wiki/features#deleteItem)
- [`hasItem(key)`](https://github.com/azurystudios/cachu/wiki/features#hasItem)
- [`prune()`](https://github.com/azurystudios/cachu/wiki/features#prune)
- [`purge()`](https://github.com/azurystudios/cachu/wiki/features#purge)
- [`getItems()`](https://github.com/azurystudios/cachu/wiki/features#getItems)
- [`getAmountOfItems()`](https://github.com/azurystudios/cachu/wiki/features#getAmountOfItems)
- [`getItemsByCondition(condition)`](https://github.com/azurystudios/cachu/wiki/features#getItemsByCondition)
- [`purgeItemsByCondition(condition)`](https://github.com/azurystudios/cachu/wiki/features#purgeItemsByCondition)
- [`getValuesOfItems()`](https://github.com/azurystudios/cachu/wiki/features#getValuesOfItems)
- [`getKeysOfItems()`](https://github.com/azurystudios/cachu/wiki/features#getKeysOfItems)
