[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## getMany()

Read a record from the cache.

### Structure:

```js
getMany([keys], config)
```

### Parameters:

- `keys` - an array of keys of the targets
- `config` *(optional)*
  - `validate` - validate age of records
  - `delete` - delete records afterwards
  - `reverse` - read records in reverse order

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
// get three existent records
await cache.getMany([1, 2, 3]) // returns an array of records
```