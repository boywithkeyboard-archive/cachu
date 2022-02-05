[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## getAmountOfEntries()

Get the number of entries the cache holds.

#### Structure:

```js
getAmountOfEntries()
```

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // returns the number of entries the cache holds
  await cache.getAmountOfEntries()
})()
```