# cachu

Simple, minimalistic key-value cache, created by [Azury](https://github.com/azurystudios).

#### Why should you use cachu?

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
import { Cachu } from 'cachu'

const cache = new Cachu({
  max: 10, // cache can contain up to 10 items
  maxAge: 60 // delete items after a minute
})

(async () => {
  await cache.setItem(123, 'hello world')
  console.log(await cache.getItem(123))
})()
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

(async () => {
  await setItem(123, 'hello world')
  console.log(await getItem(123))
})()
```

## API

### Configuration

- [`maxAge`](https://github.com/azurystudios/cachu/wiki/configuration#max-age) to set the **maximum age** for each item in the store
- [`maxAmount`](https://github.com/azurystudios/cachu/wiki/configuration#max-amount) to set the **maximum size** for the store

### Features

- [`set(key, value, maxAge)`](https://github.com/azurystudios/cachu/wiki/features#set)
- [`get(key)`](https://github.com/azurystudios/cachu/wiki/features#get)
- [`update(key, value)`](https://github.com/azurystudios/cachu/wiki/features#update)
- [`view(key)`](https://github.com/azurystudios/cachu/wiki/features#view)
- [`purge(key)`](https://github.com/azurystudios/cachu/wiki/features#purge)
- [`has(key)`](https://github.com/azurystudios/cachu/wiki/features#has)
- [`prune()`](https://github.com/azurystudios/cachu/wiki/features#prune)
- [`destroy()`](https://github.com/azurystudios/cachu/wiki/features#destroy)
- [`purgeMany(keys)`](https://github.com/azurystudios/cachu/wiki/features#purge-many)
- [`getMany(keys)`](https://github.com/azurystudios/cachu/wiki/features#get-many)
- [`getAmountOfItems()`](https://github.com/azurystudios/cachu/wiki/features#get-amount-of-items)
- [`getManyByCondition(condition)`](https://github.com/azurystudios/cachu/wiki/features#get-many-by-condition)
- [`purgeManyByCondition(condition)`](https://github.com/azurystudios/cachu/wiki/features#purge-many-by-condition)
- [`getValuesOfItems()`](https://github.com/azurystudios/cachu/wiki/features#get-values-of-items)
- [`getKeysOfItems()`](https://github.com/azurystudios/cachu/wiki/features#get-keys-of-items)
- [`each()`](https://github.com/azurystudios/cachu/wiki/features#get-keys-of-items)
