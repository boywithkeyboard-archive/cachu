# cachu

## Setup

```bash
# Get the latest release.
npm i cachu
```

## Usage

> **Note** - Need an introduction to v6? [Here](https://gist.github.com/unvented/dab8d3e987cfdd79f68e715d29c1ee17) you go!

```js
import { useCache } from 'cachu'

const cache = useCache()

// Add a new entry.
await cache.add('one', 'Hello World')
  
const entry = await cache.get('one') // 'Hello World'
```

## API

* #### Configuration

  * [`maxAge`](https://github.com/azurydev/cachu/blob/dev/guide/guide/config/maxAge.md) to set the **maximum age** for each record in the cache
  * [`maxAmount`](https://github.com/azurydev/cachu/blob/dev/guide/config/maxAmount.md) to set the **maximum size** for the cache
  * [`autodelete`](https://github.com/azurydev/cachu/blob/dev/guide/config/autodelete.md) to **delete overaged entries** on adding/updating

* #### Features

  * [`add()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/add.md)
  * [`addMany()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/addMany.md)
  * [`get()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/get.md)
  * [`getMany()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/getMany.md)
  * [`update()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/update.md)
  * [`updateMany()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/updateMany.md)
  * [`remove()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/remove.md)
  * [`removeMany()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/removeMany.md)
  * [`has()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/has.md)
  * [`size()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/size.md)
  * [`keys()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/keys.md)
  * [`values()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/values.md)
  * [`clear()`](https://github.com/azurydev/cachu/blob/dev/guide/guide/features/clear.md)

<hr>
<div align='center'>
  <h3>Chat with us</h3>
  <a href='https://azury.dev/discord'><b>Join our Discord</b></a>
</div>
<hr>
