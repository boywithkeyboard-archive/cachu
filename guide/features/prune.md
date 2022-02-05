[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## prune()

Purge all stale entries manually.

#### Structure:

```js
prune()
```

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()
  
  // purge all outdated entries
  await cache.prune()
})()
```