[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## setMany()

Create many new records in the cache.

#### Structure:

```js
setMany([[key, value]], maxAge)
```

#### Parameters:

- `key` - must be a unique key
- `value` - the value of the new record
- `maxAge` - the custom age limit in seconds for the record *(optional)*

#### Example:

```js
await cache.set([
  // key: 123 | value: 'Hello World' | maxAge: '10s'
  [123, 'Hello World', '10s'],

  // key: 'Something' | value: { someKey: 'Whatever' }
  ['Something', { someKey: 'Whatever' }]
])
```