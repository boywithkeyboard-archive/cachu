export { Cachu } from './instance.mjs'

import global from './global.mjs'
export default global

export {
  set,
  get,
  update,
  view,
  purge,
  has,
  prune,
  destroy,
  purgeMany,
  getMany,
  getAmountOfItems,
  getManyByCondition,
  purgeManyByCondition,
  getValuesOfItems,
  getKeysOfItems,
  each
} from './global.mjs'