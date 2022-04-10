[**» Back to Overview**](https://github.com/azurydev/cachu#features)

## on()

Add a event handler.

#### Structure:

```js
on(event, action)
```

#### Example:

```js
// add a event listener on setMany function
await cache.on('setMany', async () => {
  // do something
})
```