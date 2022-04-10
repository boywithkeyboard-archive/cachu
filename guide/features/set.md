[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## set()

Create a new record in the cache.

#### Structure:

```js
set(key, value, maxAge)
```

#### Parameters:

- `key` - must be a unique key
- `value` - the value of the new record
- `maxAge` - the custom age limit in seconds for the record *(optional)*

#### Example:

```js
// key: 123 | value: 'Hello World' | maxAge: '10s'
await cache.set(123, 'Hello World', '10s')

// key: 'Something' | value: { someKey: 'Whatever' }
await cache.set('Something', { someKey: 'Whatever' })
```