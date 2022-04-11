[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## newest()

Get the newest record from the cache.

### Structure:

```js
newest()
```

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
// get the newest record
await cache.newest()
```