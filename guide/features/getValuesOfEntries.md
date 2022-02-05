[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## getValuesOfEntries()

Get an array of all entry values.

#### Structure:

```js
getValuesOfEntries()
```

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // returns all entry values
  await cache.getValuesOfEntries()
})()
```