[**» Back to Overview**](https://github.com/azurydev/cachu#hooks)

## preStealing

> ℹ️ The `preStealing` hook gets fired before the `steal()` and `stealMany()` functions.

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
    preStealing: async ({ keyOfTargetedEntry }) => {
      // must return a boolean whether the entry should be returned
      return (typeof keyOfTargetedEntry === 'string') // only return entries with a string as their key on reading
    }
  }
})
```