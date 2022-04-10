[**» Back to Overview**](https://github.com/azurydev/cachu#configuration)

## maxAmount

Set the maximum amount of records the cache can hold.

**Default Value:** `10000`

### Example:

```js
import { MemoryCache } from 'cachu'

const cache = MemoryCache({
  maxAmount: 500
})
```