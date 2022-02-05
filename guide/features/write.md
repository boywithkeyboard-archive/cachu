[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## write()

Create a new entry in the cache.

#### Structure:

```js
write(key, value)
```

#### Parameters:

- **`key`** - must be unique [(read more)](https://github.com/azurydev/cachu/blob/current/guide/types.md#key)
- **`value`** [(read more)](https://github.com/azurydev/cachu/blob/current/guide/types.md#value)
<!-- - **`maxAge`** - the maximum time in seconds the record should be queryable -->

#### Example:

```js
import { MemoryCache } from 'cachu'

(async () => {
  const cache = new MemoryCache()

  cache.write(123, 'Hello World')
})()
```