# cachu

## Setup

```bash
# Get the latest release.
npm i cachu

# Try the latest commit.
npm i cachu@dev
```

## Usage

> **Note** - Need an introduction to v6? [Here](https://gist.github.com/unvented/dab8d3e987cfdd79f68e715d29c1ee17) you go!

### Node.js

```js
import { useCache } from 'cachu'

const cache = useCache()

// Add a new entry.
await cache.add('one', 'Hello World')
  
const entry = await cache.get('one') // 'Hello World'
```

### Deno

```typescript
import { useCache } from 'https://deno.land/x/cachu@v6.0.0/mod.ts'
```

### Browser

```typescript
import { useCache } from 'cachu/browser'

// Alternatively, you might want to use a CDN.
import { useCache } from 'https://cdn.jsdelivr.net/npm/cachu@6'
```

## API

* #### Configuration

  * [`maxAge`](/guide/config/maxAge.md) to set the **maximum age** for each record in the cache
  * [`maxAmount`](/guide/config/maxAmount.md) to set the **maximum size** for the cache

* #### Features

  * [`add()`](/guide/features/add.md)
  * [`addMany()`](/guide/features/addMany.md)
  * [`get()`](/guide/features/get.md)
  * [`getMany()`](/guide/features/getMany.md)
  * [`update()`](/guide/features/update.md)
  * [`updateMany()`](/guide/features/updateMany.md)
  * [`remove()`](/guide/features/remove.md)
  * [`removeMany()`](/guide/features/removeMany.md)
  * [`has()`](/guide/features/has.md)
  * [`size()`](/guide/features/size.md)
  * [`keys()`](/guide/features/keys.md)
  * [`values()`](/guide/features/values.md)
  * [`clear()`](/guide/features/clear.md)
