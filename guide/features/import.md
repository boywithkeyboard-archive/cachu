[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## import()

Import records from a `.cachu` file.

### Structure:

```js
import(path, key)
```

### Parameters:

- `path` - the path of the file
- `key` - the 32-characters long key used to export the data

### Example:

```js
import { join } from 'path'

await cache.import(join(__dirname, './path/to/the/file.cachu'))
```