[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## updateMany()

Update many records in the cache.

#### Structure:

```js
updateMany([[key, value]], config)
```

#### Parameters:

- `key` - the key of the target
- `value` the new value
- `config` *(optional)*
  - `updateAge` - update the age of the records accordingly

#### Example:

```js
// update the value and age of many records
await cache.updateMany([
  [123, 'New Value'],
  [456, 'Another New Value']
], {
  updateAge: true
})
```