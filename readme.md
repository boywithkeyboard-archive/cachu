# cachu

**Simple, minimalistic key-value cache, created by [Azury](https://azury.dev).**

#### Why should you use cachu?

- fully asynchronous
- small n' easy
- zero dependencies

###### Make sure to read our 📊 [Comparison](https://github.com/azurydev/cachu/blob/current/comparison.md) and 📃 [Changelog](https://github.com/azurydev/cachu/blob/current/changelog.md) :)

## Setup

### Install the Package

Install **cachu** using your favorite package manager.

```sh-session
npm i cachu
yarn add cachu
pnpm add cachu
```

### Usage

Just create a new instance, it's as easy as that!

```js
import Cachu from 'cachu'

const cache = new Cachu({
  maxAmount: 99, // cache can contain up to 99 records
  maxAge: 60 // keep records for up to a minute
})

(async () => {
  await cache.write(123, 'Hello World')
  console.log(await cache.get(123)) // should give out 'Hello World'
})()
```

## API

- ### Configuration

  - [`maxAge`](https://github.com/azurydev/cachu/blob/current/guide/configuration/maxAge) to set the **maximum age** for each record in the cache
  - [`maxAmount`](https://github.com/azurydev/cachu/blob/current/guide/configuration/maxAmount) to set the **maximum size** for the cache

- ### Features

  - [`write(key, value)`](https://github.com/azurydev/cachu/blob/current/guide/features/write)
  - [`writeMany(key, value)`](https://github.com/azurydev/cachu/blob/current/guide/features/writeMany)
  - [`get(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/get)
  - [`getMany(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/getMany)
  - [`getNewest()`](https://github.com/azurydev/cachu/blob/current/guide/features/getNewest)
  - [`getOldest()`](https://github.com/azurydev/cachu/blob/current/guide/features/getOldest)
  - [`update(key, value)`](https://github.com/azurydev/cachu/blob/current/guide/features/update)
  - [`updateMany(key, value)`](https://github.com/azurydev/cachu/blob/current/guide/features/updateMany)
  - [`grab(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/grab)
  - [`grabMany(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/grabMany)
  - [`purge(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/purge)
  - [`purgeMany(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/purgeMany)
  - [`steal(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/steal)
  - [`stealMany(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/stealMany)
  - [`has(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/has)
  - [`prune()`](https://github.com/azurydev/cachu/blob/current/guide/features/prune)
  - [`destroy()`](https://github.com/azurydev/cachu/blob/current/guide/features/destroy)
  - [`getAmountOfItems()`](https://github.com/azurydev/cachu/blob/current/guide/features/getAmountOfItems)
  - [`getManyByCondition(condition)`](https://github.com/azurydev/cachu/blob/current/guide/features/getManyByCondition)
  - [`purgeManyByCondition(condition)`](https://github.com/azurydev/cachu/blob/current/guide/features/purgeManyByCondition)
  - [`getValuesOfItems()`](https://github.com/azurydev/cachu/blob/current/guide/features/getValuesOfItems)
  - [`getKeysOfItems()`](https://github.com/azurydev/cachu/blob/current/guide/features/getKeysOfItems)
  - [`dump()`](https://github.com/azurydev/cachu/blob/current/guide/features/dump)
  - [`modifyMaxAge(maxAge)`](https://github.com/azurydev/cachu/blob/current/guide/features/modifyMaxAge)
  - [`modifyMaxAmount(maxAmount)`](https://github.com/azurydev/cachu/blob/current/guide/features/modifyMaxAmount)
  - [`each(action)`](https://github.com/azurydev/cachu/blob/current/guide/features/each)
