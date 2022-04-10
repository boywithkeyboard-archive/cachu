[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## maxAmount()

Retrieve or update the maximum amount of records the cache can hold.

### Structure:

```js
maxAmount(amount)
```

### Parameters:

- `amount` - the new amount

### Example:

```js
// update the limit to 500
await maxAmount(500)

// retrieve the limit
const limit = await maxAmount()
```