# cachu

**Simple, minimalistic key-value cache, created by [Azury](https://azury.dev).**

- fully asynchronous
- small n' easy
- zero dependencies

## Setup

### Installation

Install **cachu** using your favorite package manager.

```sh-session
npm i cachu
yarn add cachu
```

### Usage

Just create a new cache, it's as easy as that!

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = await MemoryCache({
    maxAmount: 10000, // cache can contain up to 10000 records
    maxAge: 600 // keep records for up to 10 minutes
  })

  await cache.set(69, 'Hello World')
  console.log(await cache.get(69)) // gives out 'Hello World'
})()
```

## Caches

- [`MemoryCache`](/guide/caches/MemoryCache.md)
- [`BrowserCache`](/guide/caches/BrowserCache.md)
- [`DiskCache`](/guide/caches/DiskCache.md)
- [`FileCache`](/guide/caches/FileCache.md)

## API

- ### Configuration

  - [`maxAge`](/guide/configuration/maxAge.md) to set the **maximum age** for each record in the cache
  - [`maxAmount`](/guide/configuration/maxAmount.md) to set the **maximum size** for the cache

- ### Features

  - [`set(key, value, age)`](/guide/features/set.md)
  - [`setMany([[key, value, age]])`](/guide/features/setMany.md)
  - [`get(key, options)`](/guide/features/get.md)
  - [`getMany([key], options)`](/guide/features/getMany.md)
  - [`update(key, value, age)`](/guide/features/update.md)
  - [`updateMany([[key, value, age]])`](/guide/features/updateMany.md)
  - [`delete(key)`](/guide/features/delete.md)
  - [`deleteMany([key])`](/guide/features/deleteMany.md)
  - [`has(key)`](/guide/features/has.md)
  - [`clear()`](/guide/features/clear.md)
  - [`size()`](/guide/features/size.md)
  - [`values()`](/guide/features/values.md)
  - [`keys()`](/guide/features/keys.md)

- ### Hooks

  - [`preWriting`](/guide/hooks/preWriting.md)
  - [`preReading`](/guide/hooks/preReading.md)
  - [`preUpdating`](/guide/hooks/preUpdating.md)
  - [`preDeleting`](/guide/hooks/preDeleting.md)
  - [`preClearing`](/guide/hooks/preClearing.md)
  - [`prePruning`](/guide/hooks/prePruning.md)