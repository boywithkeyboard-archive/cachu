# cachu

[![version](https://badgen.net/npm/v/cachu?label=Current&color=black&labelColor=purple)](https://www.npmjs.com/package/cachu)
[![npm downloads](https://badgen.net/npm/dt/cachu?icon=npm&label&color=black&labelColor=purple)](https://www.npmjs.com/package/cachu)
[![open issues](https://badgen.net/github/open-issues/azurydev/cachu?icon=github&label=Open%20Issues&color=black&labelColor=purple)](https://github.com/azurydev/cachu/issues)
[![snyk vulnerabilities](https://badgen.net/snyk/azurydev/cachu?label=Vulnerabilities&color=black&labelColor=purple)](https://snyk.io/test/github/azurydev/cachu)
[![npm package size](https://badgen.net/packagephobia/install/cachu?icon=packagephobia&label&color=black&labelColor=purple)](https://packagephobia.com/result?p=cachu)
[![language](https://badgen.net/badge/custom/Language/orange?icon=typescript&label&color=black&labelColor=purple)](https://github.com/azurydev/cachu/search?l=typescript)

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
