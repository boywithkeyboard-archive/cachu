[**» Back to Overview**](https://github.com/azurydev/cachu/tree/current#features)

## write()

#### Structure:

```js
write(key, value, maxAge)
```

#### Attributes:

- **`key`** - can be of any type except `undefined` or `null` and must be unique
- **`value`** - can be of any type, except `undefined` or `null`
- **`maxAge`** - the maximum time in seconds the record should be queryable

#### Example:

```js
import Cachu from 'cachu'

const cache = new Cachu()

(async () => {
  cache.write(123, 'Hello World', 60)
})()
```