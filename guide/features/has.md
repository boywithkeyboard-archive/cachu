[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## has()

Check whether the cache has a specific entry.

#### Structure:

```js
has(key)
```

#### Parameters:

- **`key`** - the [`key`](https://github.com/azurydev/cachu/blob/current/guide/types.md#key) of the targeted entry

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // returns a boolean
  await cache.has(123)
})()
```