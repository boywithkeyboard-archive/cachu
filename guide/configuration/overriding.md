[**» Back to Overview**](https://github.com/azurydev/cachu#configuration)

## overriding

Allow overriding of entries on writing.

By default, `overriding` is set to **false**.

#### Example:

```js
import { MemoryCache } from 'cachu'

const cache = new MemoryCache({
  overriding: true // allow overriding
})
```