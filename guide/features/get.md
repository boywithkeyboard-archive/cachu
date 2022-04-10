[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## get()

Read a record from the cache.

### Structure:

```js
get(key)
```

### Parameters:

- `key` - the key of the target

### Response:

```js
{
  key: Key,
  value: Value,
  age: Number,
  maxAge: Number || undefined
}
```

### Example:

```js
// get a existent record
await cache.get(123) // returns the record
  
// get a non-existent entry
await cache.get('something else') // returns undefined
```