[**» Back to Overview**](https://github.com/azurydev/cachu#hooks)

## prePruning

> ℹ️ The `prePruning` hook gets fired before the `prune()` function.

#### Structure:

```js
async ({ entries }) => Promise<boolean>
```

#### Attributes:

- **`entries`** - an array of all [`raw entries`](https://github.com/azurydev/cachu/blob/current/guide/types.md#rawentry) of the cache

#### Example:

```js
import { MemoryCache } from 'cachu'

const cache = new MemoryCache({
  hooks: {
    prePruning: async ({ entries }) => {
      // do something with the raw entries
      console.log(entries)

      // must return a boolean whether the cache should get pruned
      return true
    }
  }
})
```