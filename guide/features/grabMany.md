[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## grabMany()

Grab many entries from the cache (without pruning outdated entries).

#### Structure:

```js
grabMany(keys)
```

#### Parameters:

- **`keys`** - an array of [`keys`](https://github.com/azurydev/cachu/blob/current/guide/types.md#key)

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // returns an array of values
  await cache.grabMany(['some key', 'another key']) 
})()
```