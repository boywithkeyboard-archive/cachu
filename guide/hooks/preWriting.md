[**» Back to Overview**](https://github.com/azurydev/cachu/tree/current#features)

## preWriting

#### Structure:

```js
async ({ entry }) => Promise<RawEntry | null>
```

#### Attributes:

- **`entry`** - the [`raw entry`](https://github.com/azurydev/cachu/blob/current/guide/types.md#rawentry)

#### Example:

```js
import { MemoryCache } from 'cachu'

const cache = new MemoryCache({
  hooks: {
    preWriting: async ({ entry }) => {
      entry.createdAt = 1000 // modify the createdAt property on the entry
      
      // must return the modified raw entry
      return entry
    }
  }
})
```
