[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## steal()

Steal an entry from the cache.

#### Structure:

```js
steal(key)
```

#### Parameters:

- **`key`** - the [`key`](https://github.com/azurydev/cachu/blob/current/guide/types.md#key) of the targeted entry

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // steal a existent entry
  await cache.steal(123) // returns the entry's value
  
  // steal a non-existent entry
  await cache.steal('something else') // returns null
})()
```