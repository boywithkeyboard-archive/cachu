[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## getMany()

Read many entries from the cache.

#### Structure:

```js
getMany(keys)
```

#### Parameters:

- **`keys`** - an array of [`keys`](https://github.com/azurydev/cachu/blob/current/guide/types.md#key)

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // returns an array of values
  await cache.getMany(['some key', 'another key']) 
})()
```