[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## has()

Check whether the cache holds a specific record.

#### Structure:

```js
has(key)
```

#### Parameters:

- **`key`** - the key of the target

#### Example:

```js
// get either true or false
const boolean = await cache.has(123)
```