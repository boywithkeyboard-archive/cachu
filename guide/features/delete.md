[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## delete()

Delete a record from the cache.

#### Structure:

```js
delete(key)
```

#### Parameters:

- **`key`** - the key of the target

#### Example:

```js
// delete the record with the key 123
await cache.purge(123)
```