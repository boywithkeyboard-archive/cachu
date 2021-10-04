# cachu

Simple, minimalistic key-value cache, created by [Azury](https://github.com/azurystudios).

### Why use it?

- fully asynchronous
- small n' easy
- zero dependencies

## Installation

Install the package using your favorite manager.

```sh-session
npm i cachu
yarn add cachu
```

Create a basic cache instance.

```js
import cachu from 'cachu'

const cache = new cachu({
  max: 10, // cache can contain up to 10 items
  maxAge: 60 // delete each item after 1 minute
})

async function demo() {
  await cache.setKey('some key', 'hello world')
}

demo()
```

## Configuration

- `maxAge` to set the maximum age for each item in the cache <br/> 👉 `900` _(seconds)_ by default <br/><br/>
- `max` to set the maximum size for the store <br/> 👉 `Infinity` by default <br/><br/>
- `maxLength` to set the maximum length for each item <br/> 👉 `Infinity` by default _(affects only strings)_

## Features

- `setKey(key, value)` to set a new item _(will return either `true` or `false`)_ <br/> 👉 `key` can be anything, nevertheless it should be unique <br/> 👉 `value` can be of any type, doesn't have to be unique <br/><br/>
- `getKey(key)` to get a item <br/> 👉 will return the value of the item or `null` if it doesn't exist <br/><br/>
- `updateKey(key, value)` to update a key _(will return either `true` or `false`)_ <br/> 👉 `key` has to exist, in case it doesn't it'll return `false` <br/> 👉 `value` can be of any type, doesn't have to be unique <br/><br/>
- `stealKey(key)` to get a item without modifying anything <br/> 👉 will return the value of the item or `null` if it doesn't exist <br/><br/>
- `hasKey(key)` to check if a key exists <br/> 👉 will return either `true` or `false` <br/><br/>
- `hasValue(value)` to check if any item has a specific value <br/> 👉 will return either `true` or `false` <br/><br/>
- `deleteKey(key)` to delete a key <br/> 👉 will return either `true` or `false` <br/><br/>
- `purge()` to reset the cache
