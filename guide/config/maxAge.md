[**» Back to Overview**](https://github.com/azurydev/cachu#configuration)

## maxAge

Set the global age limit for cache records *(in seconds)*.

**Default Value:** `600`

### Examples:

```js
import { MemoryCache } from 'cachu'

const cache = MemoryCache({
  maxAge: 15 * 60 // 15 minutes
})
```

Alternatively, you can also use a readable time format.

```js
import { MemoryCache } from 'cachu'

const cache = MemoryCache({
  maxAge: '15m' // 15 minutes
})
```

Check out [vercel/ms](https://github.com/vercel/ms) for more examples.
