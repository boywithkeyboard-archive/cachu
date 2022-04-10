[**» Back to Overview**](https://github.com/azurydev/cachu#configuration)

## maxAge

Set the maximum age for cache entries (in seconds).

By default, `maxAge` is **600**.

#### Example:

```js
import { MemoryCache } from 'cachu'

const cache = MemoryCache({
  maxAge: 600 // 10 minutes
})

const cache = MemoryCache({
  maxAge: '10m' // 10 minutes
})
```