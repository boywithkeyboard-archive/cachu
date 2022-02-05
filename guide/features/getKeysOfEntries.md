[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## getKeysOfEntries()

Get an array of all entry keys.

#### Structure:

```js
getKeysOfEntries()
```

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // returns all entry keys
  await cache.getKeysOfEntries()
})()
```