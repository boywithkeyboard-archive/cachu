[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## get()

Read an entry from the cache.

#### Structure:

```js
get(key)
```

#### Parameters:

- **`key`** - the [`key`](https://github.com/azurydev/cachu/blob/current/guide/types.md#key) of the targeted entry

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // get a existent entry
  await cache.get(123) // returns the entry's value
  
  // get a non-existent entry
  await cache.get('something else') // returns null
})()
```