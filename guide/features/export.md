[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## export()

Export all records as a `.cachu` file.

### Structure:

```js
export(path, key)
```

### Parameters:

- `path` - the path of the directory the file should be put into
- `key` - a 32-characters long key used to encrypt the data (required for importing)

### Example:

```js
import { join } from 'path'

await cache.export(join(__dirname, '../directory'))
```