# cachu

**Simple, minimalistic key-value cache, created by [Azury](https://github.com/azurydev).**

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
pnpm add cachu
```

### Create New Instance

Just create a new instance, it's as easy as that!

```js
import Cachu from 'cachu'

const cache = new Cachu({
  maxAmount: 99, // cache can contain up to 99 items
  maxAge: 60 // keep items for up to a minute
})

(async () => {
  await cache.write(123, 'Hello World')
  console.log(await cache.get(123)) // should give out 'Hello World'
})()
```

## API

- ### Configuration

  - [`maxAge`](https://github.com/azurydev/cachu/wiki/configuration#max-age) to set the **maximum age** for each item in the store
  - [`maxAmount`](https://github.com/azurydev/cachu/wiki/configuration#max-amount) to set the **maximum size** for the store

- ### Features

  - [`write(key, value)`](https://github.com/azurydev/cachu/wiki/features#write)
  - [`writeMany(key, value)`](https://github.com/azurydev/cachu/wiki/features#write-many)
  - [`get(key)`](https://github.com/azurydev/cachu/wiki/features#get)
  - [`getMany(key)`](https://github.com/azurydev/cachu/wiki/features#get-many)
  - [`update(key, value)`](https://github.com/azurydev/cachu/wiki/features#update)
  - [`updateMany(key, value)`](https://github.com/azurydev/cachu/wiki/features#update-many)
  - [`grab(key)`](https://github.com/azurydev/cachu/wiki/features#grab)
  - [`grabMany(key)`](https://github.com/azurydev/cachu/wiki/features#grab-many)
  - [`purge(key)`](https://github.com/azurydev/cachu/wiki/features#purge)
  - [`purgeMany(key)`](https://github.com/azurydev/cachu/wiki/features#purge-many)
  - [`steal(key)`](https://github.com/azurydev/cachu/wiki/features#steal)
  - [`stealMany(key)`](https://github.com/azurydev/cachu/wiki/features#stealMany)
  - [`has(key)`](https://github.com/azurydev/cachu/wiki/features#has)
  - [`prune()`](https://github.com/azurydev/cachu/wiki/features#prune)
  - [`destroy()`](https://github.com/azurydev/cachu/wiki/features#destroy)
  - [`getAmountOfItems()`](https://github.com/azurydev/cachu/wiki/features#get-amount-of-items)
  - [`getManyByCondition(condition)`](https://github.com/azurydev/cachu/wiki/features#get-many-by-condition)
  - [`purgeManyByCondition(condition)`](https://github.com/azurydev/cachu/wiki/features#purge-many-by-condition)
  - [`getValuesOfItems()`](https://github.com/azurydev/cachu/wiki/features#get-values-of-items)
  - [`getKeysOfItems()`](https://github.com/azurydev/cachu/wiki/features#get-keys-of-items)
  - [`dump()`](https://github.com/azurydev/cachu/wiki/features#dump)
  - [`modifyMaxAge(maxAge)`](https://github.com/azurydev/cachu/wiki/features#modify-max-age)
  - [`modifyMaxAmount(maxAmount)`](https://github.com/azurydev/cachu/wiki/features#modify-max-amount)
  - [`each(action)`](https://github.com/azurydev/cachu/wiki/features#each)
