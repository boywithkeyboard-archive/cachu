[**» Back to Overview**](https://github.com/azurydev/cachu#configuration)

## maxAmount

Set the maximum amount of entries the cache can hold.

By default, `maxAmount` is **infinite**.

#### Example:

```js
import { MemoryCache } from 'cachu'

const cache = new MemoryCache({
  maxAmount: 100 // limit cache to 100 entries
})
```