# cachu

[![npm](https://img.shields.io/npm/v/cachu)](https://www.npmjs.com/package/cachu)
[![npm](https://img.shields.io/npm/dt/cachu)](https://www.npmjs.com/package/cachu)
[![GitHub last commit](https://img.shields.io/github/last-commit/azurydev/cachu)](https://github.com/azurydev/cachu)
[![GitHub issues](https://img.shields.io/github/issues-raw/azurydev/cachu)](https://github.com/azurydev/cachu/issues)
[![snyk vulnerabilities](https://snyk.io/test/github/azurydev/cachu/badge.svg)](https://snyk.io/test/github/azurydev/cachu)

Simple, minimalistic key-value cache, created by [Azury](https://github.com/azurydev).

### Why should you use cachu?

- fully asynchronous
- small n' easy
- zero dependencies

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

- ### Configuration

  - [`maxAge`](https://github.com/azurydev/cachu/wiki/configuration#max-age) to set the **maximum age** for each item in the store
  - [`maxAmount`](https://github.com/azurydev/cachu/wiki/configuration#max-amount) to set the **maximum size** for the store

- ### Features

  - [`write(key, value)`](https://github.com/azurydev/cachu/wiki/features#write)
  - [`writeMany(key, value)`](https://github.com/azurydev/cachu/wiki/features#write-many)
  - [`get(key)`](https://github.com/azurydev/cachu/wiki/features#get)
  - [`getMany(key)`](https://github.com/azurydev/cachu/wiki/features#get-many)
  - [`update(key, value)`](https://github.com/azurydev/cachu/wiki/features#update)
  - [`updateMany(key, value)`](https://github.com/azurydev/cachu/wiki/features#update-many)
  - [`view(key)`](https://github.com/azurydev/cachu/wiki/features#view)
  - [`viewMany(key)`](https://github.com/azurydev/cachu/wiki/features#view-many)
  - [`purge(key)`](https://github.com/azurydev/cachu/wiki/features#purge)
  - [`purgeMany(key)`](https://github.com/azurydev/cachu/wiki/features#purge-many)
  - [`steal(key)`](https://github.com/azurydev/cachu/wiki/features#steal)
  - [`stealMany(key)`](https://github.com/azurydev/cachu/wiki/features#stealMany)
  - [`has(key)`](https://github.com/azurydev/cachu/wiki/features#has)
  - [`prune()`](https://github.com/azurydev/cachu/wiki/features#prune)
  - [`destroy()`](https://github.com/azurydev/cachu/wiki/features#destroy)
  - [`getAmountOfItems()`](https://github.com/azurydev/cachu/wiki/features#get-amount-of-items)
  - [`getManyByCondition(condition)`](https://github.com/azurydev/cachu/wiki/features#get-many-by-condition)
  - [`purgeManyByCondition(condition)`](https://github.com/azurydev/cachu/wiki/features#purge-many-by-condition)
  - [`getValuesOfItems()`](https://github.com/azurydev/cachu/wiki/features#get-values-of-items)
  - [`getKeysOfItems()`](https://github.com/azurydev/cachu/wiki/features#get-keys-of-items)
  - [`dump()`](https://github.com/azurydev/cachu/wiki/features#dump)
  - [`modifyMaxAge(maxAge)`](https://github.com/azurydev/cachu/wiki/features#modify-max-age)
  - [`modifyMaxAmount(maxAmount)`](https://github.com/azurydev/cachu/wiki/features#modify-max-amount)
  - [`each(action)`](https://github.com/azurydev/cachu/wiki/features#each)
