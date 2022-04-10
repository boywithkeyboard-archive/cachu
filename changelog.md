# changelog

## v5

### v5.0.0

#### Breaking Changes:

- caches are no longer classes, meaning there are no constructors anymore
- simplified function names
- combined get/grab/steal methods to a single `get()` and `getMany()` method

#### New Features:

- added `recent()` feature to retrieve the most recently modified/added record
- added `ms` for milliseconds conversion

#### Changes:

- upgraded all dependencies to their latest release
- replaced `packu` with `esbuild`
- migrated to `ts-jest` for testing

## v4

### v4.1.0

#### New Features:

- introduced [`getNewest()`](https://github.com/azurydev/cachu/blob/current/guide/features/getNewest.md) feature
- introduced [`getOldest()`](https://github.com/azurydev/cachu/blob/current/guide/features/getOldest.md) feature
- added official CommonJS wrapper

### v4.0.1

#### New Features:

- added CI via Github Actions

#### Changes:

- patched `jest` and `redis`
- removed inaccessible files from production build

### v4.0.0

#### Breaking Changes:

- renamed `set()` function to [`write()`](https://github.com/azurydev/cachu/blob/current/guide/features/write.md) and `view()` to [`grab()`](https://github.com/azurydev/cachu/blob/current/guide/features/grab.md)
- made package esm-only
- migrated from Arrays to Maps for storing records

#### New Features:

- added [`writeMany()`](https://github.com/azurydev/cachu/blob/current/guide/features/writeMany.md), [`grabMany()`](https://github.com/azurydev/cachu/blob/current/guide/features/grabMany.md) features
- released **Hooks** for an easier way to extend cachu's functionality

#### Other Changes:

- updated year mentioned in license to `2022`
- added `MiniCache` and `MemoryCache`

## v2

### v2.6.1

- patched `jest` ***(dev-only)***
- fixed typo in changelog ***(dev-only)***
- removed types from github (again) ***(dev-only)***
- added automated releases (just testing) ***(dev-only)***

### v2.6.0

- removed `glob` dependency ***(dev-only)***
- removed types from github ***(dev-only)***
- edited ignored files

### v2.5.0

- added `steal` and `stealMany` functions
- removed `build` folder from github ***(dev-only)***

### v2.4.2

#### Changes

- patched TypeScript
- fixed changelog
- edited package description

### v2.4.1

#### Changes

- changed build standard to `es2021` ***(results in less code)***
- added `minify` script ***(dev-only)***
- edited types ***(dev-only)***
- renamed publish scripts ***(dev-only)***

### v2.4.0

#### Changes

- edited jsdoc declarations
- edited unit tests
- enhanced conditional querying
- patched terser

### v2.3.0

#### New

- added jsdoc declarations
- added unit tests

### v2.2.0

#### Changes

- removed global instance
- edited engine requirements

#### Bug Fixes

- made config optional

### v2.1.1

#### Bug Fixes

- fixed a minor issue

### v2.1.0

#### Changes

- added support for TypeScript
- added type definitions

### v2.0.3

#### Bug Fixes

- fixed a small issue regarding default config

### v2.0.2

#### Bug Fixes

- fixed examples

### v2.0.1

#### Changes

- removed `jest`

### v2.0.0

#### Changes

- renamed functions
- added global instance
- added `purgeMany`, `getMany`, `purgeManyByCondition`, `getManyByCondition`, `getKeysOfItems`, `getValuesOfItems`, `getAmountOfItems`, and `each` functions
- added engine requirements
- added funding
- minified package
- made testing easier

#### Bug Fixes

- fixed deletion of expired items