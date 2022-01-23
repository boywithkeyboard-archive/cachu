[**» Back to Overview**](https://github.com/azurydev/cachu/tree/current#features)

## purgeMany()

**Action:** `purge.many` *(passed by hooks)*

#### Structure:

```js
purgeMany(keys)
```

#### Attributes:

- **`keys`** - an array of [`Keys`](https://github.com/azurydev/cachu/blob/current/guide/types/key.md)

#### Example:

```js
(async () => {
  // purge all entries
  await cache.purgeMany([])
  
  // purge many entries
  await cache.purgeMany([keyOne, keyTwo, keyThree])
})()
```