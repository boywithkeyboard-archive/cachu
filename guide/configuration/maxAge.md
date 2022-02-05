[**» Back to Overview**](https://github.com/azurydev/cachu#configuration)

## maxAge

Set the maximum age for cache entries (in seconds).

By default, `maxAge` is **infinite**.

#### Example:

```js
import { MemoryCache } from 'cachu'

const cache = new MemoryCache({
  maxAge: 10 * 60 // 10 minutes
})
```