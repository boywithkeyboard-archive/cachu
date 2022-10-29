# cachu

## Setup

```bash
# Get the latest release.
npm i cachu
```

## Usage

```js
import { Cache } from 'cachu'

const cache = new Cache({
  maximumAge: '10m', // 10 minutes, can be specified as number (in seconds) or readable string
  ...
})

// Add a new record.
await cache.add('one', 'Hello World')
  
const record = await cache.get('one') // 'Hello World'
```

## API

* #### Configuration (optional)

  * `autodelete` to **delete overaged entries** on adding/updating *(disabled by default)*
  * `maximumAge` to set the **maximum age** for each record in the cache *(defaults to 600s)*
  * `maximumAmount` to set the **maximum size** for the cache *(defaults to 10000)*
  * `maximumRecordSize` to set the **maximum size** for each record *(defaults to 10 KB)*

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
  * `clear()` *(delete all overaged records manually)*
