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
// es
import cachu from 'cachu'

// common js
const cachu = require('cachu')

const cache = new cachu({
  max: 10, // cache can contain up to 10 items
  maxAge: 60 // delete each item after 1 minute
})

async function demo() {
  await cache.setKey('some key', 'hello world')
}

demo()
```

## API

### Global Config

- [`maxAge`](https://cachu.js.org/configuration#maxAge) to set the **maximum age** for each item in the store
- [`max`](https://cachu.js.org/configuration#max) to set the **maximum size** for the store

### Features

- [`setItem(key, value, maxAge)`](https://cachu.js.org/features#setItem)
- [`getItem(key)`](https://cachu.js.org/features#getItem)
- [`updateItem(key, value)`](https://cachu.js.org/features#updateItem)
- [`viewItem(key)`](https://cachu.js.org/features#viewItem)
- [`deleteItem(key)`](https://cachu.js.org/features#deleteItem)
- [`hasItem(key)`](https://cachu.js.org/features#hasItem)
- [`prune()`](https://cachu.js.org/features#prune)
- [`purge()`](https://cachu.js.org/features#purge)
- [`getItems()`](https://cachu.js.org/features#getItems)
- [`getAmountOfItems()`](https://cachu.js.org/features#getAmountOfItems)
- [`getItemsByCondition(condition)`](https://cachu.js.org/features#getItemsByCondition)
- [`purgeItemsByCondition(condition)`](https://cachu.js.org/features#purgeItemsByCondition)
- [`getValuesOfItems()`](https://cachu.js.org/features#getValuesOfItems)
- [`getKeysOfItems()`](https://cachu.js.org/features#getKeysOfItems)