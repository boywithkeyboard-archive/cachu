# cachu

[![npm](https://img.shields.io/npm/v/cachu)](https://www.npmjs.com/package/cachu)
[![npm](https://img.shields.io/npm/dt/cachu)](https://www.npmjs.com/package/cachu)
[![GitHub last commit](https://img.shields.io/github/last-commit/azurystudios/cachu)](https://github.com/azurystudios/cachu)
[![GitHub issues](https://img.shields.io/github/issues-raw/azurystudios/cachu)](https://github.com/azurystudios/cachu/issues)
[![snyk vulnerabilities](https://snyk.io/test/github/azurystudios/cachu/badge.svg)](https://snyk.io/test/github/azurystudios/cachu)

Simple, minimalistic key-value cache, created by [Azury](https://github.com/azurystudios).

> Compatible with Node.js [v16](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md) and [v17](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V17.md) only!

#### Why should you use cachu?

- fully asynchronous
- small n' easy
- zero dependencies

Upcoming features are listed [over here](https://github.com/azurystudios/cachu/projects/1).

#### Known Issues

*Currently there are no known issues.*

## Installation

### Install the Package

Install it using your favorite package manager.

```sh-session
npm i cachu
yarn add cachu
pnpm add cachu
```

### Create New Instance

Just create a new instance, it's as easy as that!

```js
import { Cachu } from 'cachu'

const cache = new Cachu({
  maxAmount: 10, // cache can contain up to 10 items
  maxAge: 60 // delete items after a minute
})

const demo = async () => {
  await cache.set(123, 'hello world')
  console.log(await cache.get(123))
}
demo()
```

## API

### Configuration

- [`maxAge`](https://github.com/azurystudios/cachu/wiki/configuration#max-age) to set the **maximum age** for each item in the store
- [`maxAmount`](https://github.com/azurystudios/cachu/wiki/configuration#max-amount) to set the **maximum size** for the store

### Features

- [`set(key, value)`](https://github.com/azurystudios/cachu/wiki/features#set)
- [`get(key)`](https://github.com/azurystudios/cachu/wiki/features#get)
- [`update(key, value)`](https://github.com/azurystudios/cachu/wiki/features#update)
- [`view(key)`](https://github.com/azurystudios/cachu/wiki/features#view)
- [`purge(key)`](https://github.com/azurystudios/cachu/wiki/features#purge)
- [`steal(key)`](https://github.com/azurystudios/cachu/wiki/features#steal)
- [`has(key)`](https://github.com/azurystudios/cachu/wiki/features#has)
- [`prune()`](https://github.com/azurystudios/cachu/wiki/features#prune)
- [`destroy()`](https://github.com/azurystudios/cachu/wiki/features#destroy)
- [`purgeMany(keys)`](https://github.com/azurystudios/cachu/wiki/features#purge-many)
- [`getMany(keys)`](https://github.com/azurystudios/cachu/wiki/features#get-many)
- [`stealMany(keys)`](https://github.com/azurystudios/cachu/wiki/features#steal-many)
- [`getAmountOfItems()`](https://github.com/azurystudios/cachu/wiki/features#get-amount-of-items)
- [`getManyByCondition(condition)`](https://github.com/azurystudios/cachu/wiki/features#get-many-by-condition)
- [`purgeManyByCondition(condition)`](https://github.com/azurystudios/cachu/wiki/features#purge-many-by-condition)
- [`getValuesOfItems()`](https://github.com/azurystudios/cachu/wiki/features#get-values-of-items)
- [`getKeysOfItems()`](https://github.com/azurystudios/cachu/wiki/features#get-keys-of-items)
- [`each(action)`](https://github.com/azurystudios/cachu/wiki/features#each)
