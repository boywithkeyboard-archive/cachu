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

- [`maxAge`](https://cachu.js.org/configuration#maxAge) to set the **maximum age** for each item in the store
- [`max`](https://cachu.js.org/configuration#max) to set the **maximum size** for the store

### Features

- [`setItem(key, value, maxAge)`](https://cachu.js.org/features#setItem)
- [`getItem(key)`](https://cachu.js.org/features#getItem)
- [`updateItem(key, value)`](https://cachu.js.org/features#updateItem)
- [`viewItem(key)`](https://cachu.js.org/features#viewItem)
- [`deleteItem(key)`](https://cachu.js.org/features#deleteItem)
- [`hasItem(key)`](https://cachu.js.org/features#hasItem)
- [`prune()`](https://cachu.js.org/features#prune)
- [`purge()`](https://cachu.js.org/features#purge)
- [`getItems()`](https://cachu.js.org/features#getItems)
- [`getAmountOfItems()`](https://cachu.js.org/features#getAmountOfItems)
- [`getItemsByCondition(condition)`](https://cachu.js.org/features#getItemsByCondition)
- [`purgeItemsByCondition(condition)`](https://cachu.js.org/features#purgeItemsByCondition)
- [`getValuesOfItems()`](https://cachu.js.org/features#getValuesOfItems)
- [`getKeysOfItems()`](https://cachu.js.org/features#getKeysOfItems)
