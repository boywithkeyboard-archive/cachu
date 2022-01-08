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

  - [`write(key, value)`](https://github.com/azurydev/cachu/blob/current/guide/features/write.md)
  - [`writeMany(key, value)`](https://github.com/azurydev/cachu/blob/current/guide/features/writeMany.md)
  - [`get(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/get.md)
  - [`getMany(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/getMany.md)
  - [`getNewest()`](https://github.com/azurydev/cachu/blob/current/guide/features/getNewest.md)
  - [`getOldest()`](https://github.com/azurydev/cachu/blob/current/guide/features/getOldest.md)
  - [`modify(key, value)`](https://github.com/azurydev/cachu/blob/current/guide/features/modify.md)
  - [`modifyMany(key, value)`](https://github.com/azurydev/cachu/blob/current/guide/features/modifyMany.md)
  - [`grab(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/grab.md)
  - [`grabMany(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/grabMany.md)
  - [`purge(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/purge.md)
  - [`purgeMany(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/purgeMany.md)
  - [`steal(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/steal.md)
  - [`stealMany(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/stealMany.md)
  - [`has(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/has.md)
  - [`prune()`](https://github.com/azurydev/cachu/blob/current/guide/features/prune.md)
  - [`destroy()`](https://github.com/azurydev/cachu/blob/current/guide/features/destroy.md)
  - [`getAmountOfEntries()`](https://github.com/azurydev/cachu/blob/current/guide/features/getAmountOfEntries.md)
  - [`getManyByCondition(condition)`](https://github.com/azurydev/cachu/blob/current/guide/features/getManyByCondition.md)
  - [`purgeManyByCondition(condition)`](https://github.com/azurydev/cachu/blob/current/guide/features/purgeManyByCondition.md)
  - [`getValuesOfEntries()`](https://github.com/azurydev/cachu/blob/current/guide/features/getValuesOfEntries.md)
  - [`getKeysOfEntries()`](https://github.com/azurydev/cachu/blob/current/guide/features/getKeysOfEntries.md)
  - [`dump()`](https://github.com/azurydev/cachu/blob/current/guide/features/dump.md)
  - [`modifyMaxAge(maxAge)`](https://github.com/azurydev/cachu/blob/current/guide/features/modifyMaxAge.md)
  - [`modifyMaxAmount(maxAmount)`](https://github.com/azurydev/cachu/blob/current/guide/features/modifyMaxAmount.md)
  - [`each(action)`](https://github.com/azurydev/cachu/blob/current/guide/features/each.md)
