export { instance } from './instance.js'

import global from './global.js'
export default global

export {
  setItem,
  getItem,
  updateItem,
  viewItem,
  hasItem,
  deleteItem,
  prune,
  purge,
  getItems,
  getAmountOfItems,
  getItemsByCondition,
  purgeItemsByCondition,
  getValuesOfItems,
  getKeysOfItems
} from './global.js'