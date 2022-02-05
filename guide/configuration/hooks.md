[**» Back to Overview**](https://github.com/azurydev/cachu#configuration)

## hooks

Customize **cachu**'s functionality to your desire with the [hooks](https://github.com/azurydev/cachu#hooks) you need.

By default, no hooks are set.

#### Example:

```js
import { MemoryCache } from 'cachu'

const cache = new MemoryCache({
  hooks: {
    preReading: async ({ keyOfTargetedEntry }) => {
      return (typeof keyOfTargetedEntry === 'string')
    }
  }
})
```