[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## getConsumedMemory()

Calculates the amount of memory in bytes consumed by the cache (in bytes).

#### Structure:

```js
getConsumedMemory()
```

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // returns the amount of memory consumed by the cache
  await cache.getConsumedMemory()
})()
```