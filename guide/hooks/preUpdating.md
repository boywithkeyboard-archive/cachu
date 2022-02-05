[**» Back to Overview**](https://github.com/azurydev/cachu#hooks)

## preUpdating

> ℹ️ The `preUpdating` hook gets fired before the `update()` and `updateMany()` functions.

#### Structure:

```js
async ({ keyOfTargetedEntry }) => Promise<boolean>
```

#### Attributes:

- **`keyOfTargetedEntry`** - the [`key`](https://github.com/azurydev/cachu/blob/current/guide/types.md#key) of the entry that should be read

#### Example:

```js
import { MemoryCache } from 'cachu'

const cache = new MemoryCache({
  hooks: {
    preUpdating: async ({ keyOfTargetedEntry }) => {
      // must return a boolean whether the entry should get updated
      return (typeof keyOfTargetedEntry === 'string') // only update entries with a string as their key
    }
  }
})
```