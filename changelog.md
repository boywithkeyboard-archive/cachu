# changelog

### Available Releases:

- #### v4
  - [v4.0.0](#v400)

[Outdated Releases](https://github.com/azurydev/cachu/tree/current/changelog)

## Releases

### v4.0.0

#### Breaking Changes

- renamed `set()` function to [`write()`](https://github.com/azurydev/cachu/blob/current/guide/features/write.md) and `view()` to [`grab()`](https://github.com/azurydev/cachu/blob/current/guide/features/grab.md)
- made package esm-only
- migrated from Arrays to Maps for storing records

#### Other Changes

- updated year mentioned in license to `2022`
- added `MiniCache` and `MemoryCache`

#### New Features

- added [`writeMany()`](https://github.com/azurydev/cachu/blob/current/guide/features/writeMany.md), [`grabMany()`](https://github.com/azurydev/cachu/blob/current/guide/features/grabMany.md) features
- released **Hooks** for an easier way to extend cachu's functionality