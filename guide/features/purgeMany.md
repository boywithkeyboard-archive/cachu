[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## purgeMany()

Purge many or all entries from the cache.

#### Structure:

```js
purgeMany(keys)
```

#### Attributes:

- **`keys`** - an array of [`keys`](https://github.com/azurydev/cachu/blob/current/guide/types.md#key)

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // purge all entries
  await cache.purgeMany([])
  
  // purge many entries
  await cache.purgeMany([keyOne, keyTwo, keyThree])
})()
```
