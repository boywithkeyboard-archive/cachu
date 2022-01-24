# cachu

**Simple, minimalistic key-value cache, created by [Azury](https://azury.dev).**

- fully asynchronous
- small n' easy
- zero dependencies

###### Make sure to read our 📃 [Changelog](https://github.com/azurydev/cachu/blob/current/changelog.md)

## Setup

### Install the Package

Install **cachu** using your favorite package manager.

```sh-session
npm i cachu
yarn add cachu
```

### Usage

Just create a new instance, it's as easy as that!

```js
import { MemoryCache } from 'cachu'

const cache = new MemoryCache({
  maxAmount: 420, // cache can contain up to 420 records
  maxAge: 60 // keep records for up to a minute
})

(async () => {
  await cache.write(69, 'Hello World')
  console.log(await cache.get(69)) // should give out 'Hello World'
})()
```

## Caches

- [`MemoryCache`](https://github.com/azurydev/cachu/blob/current/guide/caches/MemoryCache.md)
- [`MiniCache`](https://github.com/azurydev/cachu/blob/current/guide/caches/MiniCache.md)

## API

- ### Configuration

  - [`maxAge`](https://github.com/azurydev/cachu/blob/current/guide/configuration/maxAge.md) to set the **maximum age** for each record in the cache
  - [`maxAmount`](https://github.com/azurydev/cachu/blob/current/guide/configuration/maxAmount.md) to set the **maximum size** for the cache
  - [`overrideEntries`](https://github.com/azurydev/cachu/blob/current/guide/configuration/overrideEntries.md) to allow overriding of entries on reading
  - [`hooks`](https://github.com/azurydev/cachu/blob/current/guide/configuration/hooks.md) to extend **cachu**'s functionality

- ### Features

  - [`write(key, value)`](https://github.com/azurydev/cachu/blob/current/guide/features/write.md)
  - [`writeMany([{key, value}])`](https://github.com/azurydev/cachu/blob/current/guide/features/writeMany.md)
  - [`get(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/get.md)
  - [`getMany(keys)`](https://github.com/azurydev/cachu/blob/current/guide/features/getMany.md)
  - [`update(key, value)`](https://github.com/azurydev/cachu/blob/current/guide/features/modify.md)
  - [`updateMany([{key, value}])`](https://github.com/azurydev/cachu/blob/current/guide/features/modifyMany.md)
  - [`grab(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/grab.md)
  - [`grabMany(keys)`](https://github.com/azurydev/cachu/blob/current/guide/features/grabMany.md)
  - [`purge(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/purge.md)
  - [`purgeMany(keys)`](https://github.com/azurydev/cachu/blob/current/guide/features/purgeMany.md)
  - [`steal(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/steal.md)
  - [`stealMany(keys)`](https://github.com/azurydev/cachu/blob/current/guide/features/stealMany.md)
  - [`has(key)`](https://github.com/azurydev/cachu/blob/current/guide/features/has.md)
  - [`prune()`](https://github.com/azurydev/cachu/blob/current/guide/features/prune.md)
  - [`getAmountOfEntries()`](https://github.com/azurydev/cachu/blob/current/guide/features/getAmountOfEntries.md)
  - [`getValuesOfEntries()`](https://github.com/azurydev/cachu/blob/current/guide/features/getValuesOfEntries.md)
  - [`getKeysOfEntries()`](https://github.com/azurydev/cachu/blob/current/guide/features/getKeysOfEntries.md)
