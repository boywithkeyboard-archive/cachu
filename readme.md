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
  const cache = MemoryCache()

  // add a new record
  await cache.set('one', 'Hello Github')

  // retrieve the value of a record
  const { value } = await cache.get('one')
})()
```

## Caches

- [`MemoryCache`](/guide/caches/MemoryCache.md)

## API

- ### Configuration

  - [`maxAge`](/guide/config/maxAge.md) to set the **maximum age** for each record in the cache
  - [`maxAmount`](/guide/config/maxAmount.md) to set the **maximum size** for the cache

- ### Features

  - [`set(key, value, maxAge)`](/guide/features/set.md)
  - [`setMany([[key, value, maxAge]])`](/guide/features/setMany.md)
  - [`get(key, config)`](/guide/features/get.md)
  - [`getMany([keys], config)`](/guide/features/getMany.md)
  - [`update(key, value, config)`](/guide/features/update.md)
  - [`updateMany([[key, value]], config)`](/guide/features/updateMany.md)
  - [`delete(key)`](/guide/features/delete.md)
  - [`deleteMany([keys])`](/guide/features/deleteMany.md)
  - [`has(key)`](/guide/features/has.md)
  - [`size()`](/guide/features/size.md)
  - [`keys()`](/guide/features/keys.md)
  - [`values()`](/guide/features/values.md)
  - [`clear()`](/guide/features/clear.md)
  - [`recent()`](/guide/features/recent.md)
  - [`maxAge(age)`](/guide/features/maxAge.md)
  - [`maxAmount(amount)`](/guide/features/maxAmount.md)
  - [`oldest()`](/guide/features/oldest.md)
  - [`newest()`](/guide/features/newest.md)
  - [`on(event, action)`](/guide/features/on.md)
  - [`dump()`](/guide/features/newest.md)