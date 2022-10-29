# Changelog

## v7.0.0

### Breaking Changes

- **changed the way you create a new cache.**
  
  ```js
  // before v7
  import { useCache } from 'cachu'

  const cache = useCache({
    maxAge: '10m',
    maxAmount: 10000,
    autodelete: false
  })

  // v7
  import { Cache } from 'cachu'

  const cache = new Cache({
    maximumAge: '10m',
    maximumAmount: 10000,
    autodelete: false
  })
  ```

### New Features

- **you can now set a maximum size for each record.**
  
  ```js
  import { Cache } from 'cachu'

  const cache = new Cache({
    maximumRecordSize: '10 KB'

    // alternatively, you can specify the amount of bytes as a number
    maximumRecordSize: 10000
  })
  ```
