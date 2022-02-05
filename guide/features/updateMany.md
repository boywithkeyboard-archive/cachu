[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## updateMany()

Modify many entries in the cache.

#### Structure:

```js
updateMany(entries)
```

#### Parameters:

- **`entries`** - an array of [entries](https://github.com/azurydev/cachu/blob/current/guide/types.md#entry)

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()

  // write some entries
  await cache.writeMany([
    {
      key: 1,
      value: 'Hello World'
    },
    {
      key: 2,
      value: 'Hello Earth'
    }
  ])

  // modify the entries
  await cache.updateMany([
    {
      key: 1,
      value: 'Hello Programmers'
    },
    {
      key: 2,
      value: 'Hello Github'
    }
  ])

  // should return ['Hello Programmers', 'Hello Github']
  await cache.getMany([1, 2])
})()
```