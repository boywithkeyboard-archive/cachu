# Changelog

**You can read the old changelog [here](https://github.com/azurydev/cachu/blob/bc8cc689cacb5ef83b4b42f7888cafdd8477d42c/changelog.md).**

## v6.0.0

### Breaking Changes:

- Changed functionality of `get()` and `getMany()`.

  ```js
  // with v5
  const entry = await cache.get('something')

  let value
  
  if (!entry)
    value = entry.value

  // with v6
  const value = await cache.get('something')
  ```

- Removed `export()`, `import()` and `dump()` functions.

- cachu is now a **object-oriented** library.

  ```js
  import { MemoryCache } from 'cachu'

  // with v5
  const cache = MemoryCache()

  // with v6
  const cache = new MemoryCache()
  ```

- cachu is now a [**esm-only package**](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) and requires at least **Node.js v18**.

### New Features:

- Added a `DiskCache` *(which saves all data to the disk)*.
- Added a option to limit the memory usage of `MemoryCache` instances *(and added built-in limitations for additional safety)*.
