[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## oldest()

Get the oldest record from the cache.

### Structure:

```js
oldest()
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
// get the oldest record
await cache.oldest()
```