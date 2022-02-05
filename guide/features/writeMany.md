[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## writeMany()

Create many new entries in the cache.

#### Structure:

```js
writeMany(entries)
```

#### Parameters:

- **`entries`** - an array of [entries](https://github.com/azurydev/cachu/blob/current/guide/types.md#entry)

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()

  cache.writeMany([
    {
      key: 123,
      value: 'Hello World'
    },
    {
      key: 123456,
      value: 'Whatever'
    }
  ])
})()
```