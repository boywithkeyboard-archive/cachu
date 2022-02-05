[**» Back to Overview**](https://github.com/azurydev/cachu/tree/current#features)

## prePurging

> ℹ️ The `prePurging` hook gets fired before the `purge()` and `purgeMany()` functions.

#### Structure:

```js
async ({ keyOfTargetedEntry }) => Promise<boolean>
```

#### Attributes:

- **`keyOfTargetedEntry`** - the [`key`](https://github.com/azurydev/cachu/blob/current/guide/types.md#key) of the entry that should be purged

#### Example:

```js
import { MemoryCache } from 'cachu'

const cache = new MemoryCache({
  hooks: {
    prePurging: async ({ keyOfTargetedEntry }) => {
      // must return a boolean whether the entry should be purged from the cache
      return (typeof keyOfTargetedEntry === 'string') // only purge entries with a string as their key
    }
  }
})
```