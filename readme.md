## cachu

> **Warning**  
> cachu v6 is **not yet production-ready** and may contain bugs causing memory leaks. Check out the docs for our stable version [here](https://github.com/azurydev/cachu/tree/v5.x).

### Setup

#### Installation

```bash
# Install the latest (stable) release.
npm i cachu

# Try out new features before they hit our stable release.
npm i cachu@canary
```

#### Usage

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()

  // Set a new entry.
  await cache.set('one', 'Hello World')

  console.log(await cache.get('one')) // Gives out "Hello World" on console.
})()
```

### Caches

- [`BigCache`](/guide/caches/BigCache.md) *(coming soon)*
- [`MemoryCache`](/guide/caches/MemoryCache.md)
- [`DiskCache`](/guide/caches/DiskCache.md) *(coming soon)*

### API

- #### Configuration

  - [`maxAge`](/guide/config/maxAge.md) to set the **maximum age** for each record in the cache
  - [`maxAmount`](/guide/config/maxAmount.md) to set the **maximum size** for the cache

- #### Features

  - [`set(key, value, maxAge)`](/guide/features/set.md)
  - [`setMany([[key, value, maxAge]])`](/guide/features/setMany.md)
  - [`get(key, config)`](/guide/features/get.md)
  - [`getMany([keys], config)`](/guide/features/getMany.md)
  - [`update(key, value)`](/guide/features/update.md)
  - [`updateMany([[key, value]])`](/guide/features/updateMany.md)
  - [`delete(key)`](/guide/features/delete.md)
  - [`deleteMany([keys])`](/guide/features/deleteMany.md)
  - [`has(key)`](/guide/features/has.md)
  - [`size()`](/guide/features/size.md)
  - [`keys()`](/guide/features/keys.md)
  - [`values()`](/guide/features/values.md)
  - [`clear()`](/guide/features/clear.md)
  - [`recent()`](/guide/features/recent.md)
  - [`maxAge(maxAge)`](/guide/features/maxAge.md)
  - [`maxAmount(maxAmount)`](/guide/features/maxAmount.md)
  - [`on(event, action)`](/guide/features/on.md)
