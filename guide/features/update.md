[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## update()

Update a record in the cache.

#### Structure:

```js
update(key, value, config)
```

#### Parameters:

- `key` - the key of the target
- `value` the new value
- `config` *(optional)*
  - `updateAge` - update the age of the record accordingly

#### Example:

```js
// update the value and age of a record
await cache.update(123, 'New Value', {
  updateAge: true
})
```