[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## dump()

Get all records from the cache.

### Structure:

```js
dump()
```

### Response:

```js
[
  {
    key: Key,
    value: Value,
    age: Number,
    maxAge: Number || undefined
  },
  ...
]
```

### Example:

```js
// get all records
const records = await cache.dump()
```