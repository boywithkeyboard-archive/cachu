[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## deleteMany()

Delete many or all entries from the cache.

#### Structure:

```js
deleteMany([keys])
```

#### Parameters:

- **`keys`** - an array of keys of the targets

#### Example:

```js
// delete all entries
await cache.purgeMany([])
  
// delete the records with the keys 123 and 456
await cache.purgeMany([123, 456])
```
