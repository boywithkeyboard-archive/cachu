export { Cachu } from './instance'

import global from './global'
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
} from './global'