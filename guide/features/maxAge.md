[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## maxAge()

Retrieve or update the age limit for records.

### Structure:

```js
maxAge(age)
```

### Parameters:

- `age` - the new age *(in seconds)*

### Example:

```js
// update the age limit to 15 minutes
await maxAge('15m')

// retrieve the age limit
const limit = await maxAge()

// update the age limit to 10 minutes
await maxAge(600)
```