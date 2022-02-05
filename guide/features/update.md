[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## update()

Modify an entry in the cache.

#### Structure:

```js
update(key, value)
```

#### Parameters:

- **`key`** - the [key](https://github.com/azurydev/cachu/blob/current/guide/types.md#key) of the targeted entry
- **`value`** some new [value](https://github.com/azurydev/cachu/blob/current/guide/types.md#value)

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()

  // create a entry
  await cache.write(1, 'Hello World')

  // modify the entry
  await cache.update(1, 'Hello Earth')

  // should give out 'Hello Earth' on console
  console.log(await cache.get(1))
})()
```