[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## recent()

Get the most recent updated or added record.

### Structure:

```js
recent()
```

### Response:

Can be either

```js
{
  key: Key,
  value: Value,
  age: Number,
  maxAge: Number || undefined
}
```

or `undefined`.

### Example:

```js
// get the recent record
const record = await cache.recent()
```