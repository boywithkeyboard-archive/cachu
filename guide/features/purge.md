[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## purge()

Purge an entry from the cache.

#### Structure:

```js
purge(key)
```

#### Attributes:

- **`key`** - the [`key`](https://github.com/azurydev/cachu/blob/current/guide/types.md#key) of the targeted entry

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // purge the entry with the key 123
  await cache.purge(123)
})()
```