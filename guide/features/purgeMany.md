[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## purgeMany()

**Action:** `purge.many` *(passed by hooks)*

#### Structure:

```js
purgeMany(keys)
```

#### Attributes:

- **`keys`** - an array of [`keys`](https://github.com/azurydev/cachu/blob/current/guide/types.md#key)

#### Example:

```js
(async () => {
  // purge all entries
  await cache.purgeMany([])
  
  // purge many entries
  await cache.purgeMany([keyOne, keyTwo, keyThree])
})()
```
