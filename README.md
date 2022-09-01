# cachu

> **Warning** - As of September 2022, cachu is being retired. It has all features you can expect from a simple cache module and can be considered stable. No further updates are anticipated.

## Setup

```bash
# Get the latest release.
npm i cachu
```

## Usage

> **Note** - Need an introduction to v6? [Here](https://gist.github.com/unvented/dab8d3e987cfdd79f68e715d29c1ee17) you go!

```js
import { useCache } from 'cachu'

const cache = useCache({
  maxAge: '10m', // 10 minutes, can be specified as number (in seconds) or readable string
  ...
})

// Add a new entry.
await cache.add('one', 'Hello World')
  
const entry = await cache.get('one') // 'Hello World'
```

## API

* #### Configuration (optional)

  * `maxAge` to set the **maximum age** for each record in the cache *(defaults to 600s)*
  * `maxAmount` to set the **maximum size** for the cache *(defaults to 10000)*
  * `autodelete` to **delete overaged entries** on adding/updating *(disabled by default)*

* #### Features

  * `add()`
  * `addMany()`
  * `get()`
  * `getMany()`
  * `update()`
  * `updateMany()`
  * `remove()`
  * `removeMany()`
  * `has()`
  * `size()` *(get the cache size in bytes)*
  * `keys()`
  * `values()`
  * `clear()` *(delete all overaged entries manually)*
