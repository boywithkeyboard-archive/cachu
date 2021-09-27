# Cache

Simple, modern key-based cache with support for Redis, created by Devyl.

#### Why use it?

- completely asynchronous
- built for production
- no dependencies
- smallest cache out there

## Installation

Install the package using your favorite manager.

```sh-session
npm i devyl
yarn add devyl
```

Create a basic cache instance.

```js
import cache from '@devyl/cache'

const myCache = new cache({
  maxAge: 60, // items expire after 1 minute
  maxLength: 10 // cache can contain up to 10 items
})

myCache.setKey('first key', 'hello world!')
```

## Usage

### Configuration

- [`maxAge`](#configuration) to set the maximum age (in seconds) for each item in the cache (defaults to `900`)
- [`maxLength`](#configuration) to set the maximum size of the cache (defaults to `100`)

### Features

- [`setKey(key, value)`](#features) to set a new key
- [`getKey(key)`](#features) to get a key (will return `null` if key couldn't be found)
- [`updateKey(key, value)`](#features) to update a key
- [`readKey(key)`](#features) to read a key without modifying it
- [`hasKey(key)`](#features) to check if a key exists (`boolean`)
- [`deleteKey(key)`](#features) to delete a key
- [`purge()`](#features) to clear the cache
